import { Particle } from './particle';
import { createCanvas, resizeCanvas } from './utils';
import type { EngineOptions, Effect } from './types';

export class CursorFXEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private effect: Effect | null = null;
  private maxParticles: number = 500; // Cap to prevent performance issues
  private lastParticleTime: number = 0;
  private particleThrottle: number = 16; // Create particles every 16ms (~60fps)
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  private minMoveDistance: number = 0; // Create particles on every valid move

  constructor(options: EngineOptions = {}) {
    if (options.canvas) {
      this.canvas = options.canvas;
    } else {
      const container = options.container || document.body;
      this.canvas = createCanvas(container);
    }

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }
    this.ctx = ctx;

    // Bind methods once to prevent memory leaks
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener('resize', this.handleResize);
  }

  private handleResize(): void {
    resizeCanvas(this.canvas);
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.effect) return;

    const now = Date.now();
    const dx = e.clientX - this.lastMouseX;
    const dy = e.clientY - this.lastMouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Use effect-specific throttle and move distance if provided
    const throttle = this.effect.throttle ?? this.particleThrottle;
    const minDist = this.effect.minMoveDistance ?? this.minMoveDistance;

    // Only create particles if enough time passed AND mouse moved enough
    if (now - this.lastParticleTime >= throttle && distance >= minDist) {
      this.lastParticleTime = now;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      const particles = this.effect.onMouseMove(e.clientX, e.clientY);
      this.addParticles(particles);
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.effect || e.touches.length === 0) return;

    const now = Date.now();
    const touch = e.touches[0];
    const dx = touch.clientX - this.lastMouseX;
    const dy = touch.clientY - this.lastMouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Use effect-specific throttle and move distance if provided
    const throttle = this.effect.throttle ?? this.particleThrottle;
    const minDist = this.effect.minMoveDistance ?? this.minMoveDistance;

    // Only create particles if enough time passed AND touch moved enough
    if (now - this.lastParticleTime >= throttle && distance >= minDist) {
      this.lastParticleTime = now;
      this.lastMouseX = touch.clientX;
      this.lastMouseY = touch.clientY;
      const particles = this.effect.onMouseMove(touch.clientX, touch.clientY);
      this.addParticles(particles);
    }
  }

  addParticle(particle: Particle): void {
    if (this.particles.length < this.maxParticles) {
      this.particles.push(particle);
    }
  }

  addParticles(particles: Particle[]): void {
    const availableSlots = this.maxParticles - this.particles.length;
    if (availableSlots > 0) {
      this.particles.push(...particles.slice(0, availableSlots));
    }
  }

  private update(): void {
    // Update all particles
    this.particles.forEach(particle => particle.update());
    // Remove dead particles
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  private draw(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Render all particles with shadow/glow effects
    this.particles.forEach(particle => particle.draw(this.ctx));
  }

  private animate(): void {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  }

  start(effect: Effect): void {
    if (this.animationId === null) {
      this.effect = effect;
      this.animationId = requestAnimationFrame(this.animate);
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('touchmove', this.handleTouchMove, { passive: true });
    }
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('touchmove', this.handleTouchMove);
    }
  }

  clear(): void {
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  destroy(): void {
    this.stop();
    this.clear();
    window.removeEventListener('resize', this.handleResize);
    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }
}
