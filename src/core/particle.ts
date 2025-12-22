import type { ParticleConfig } from './types';
import { drawStar, drawRectangle } from './utils';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  gravity: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'star' | 'rectangle' | 'circle';

  constructor(config: ParticleConfig) {
    this.x = config.x;
    this.y = config.y;
    this.vx = config.vx ?? (Math.random() - 0.5) * 4;
    this.vy = config.vy ?? (Math.random() - 0.5) * 4;
    this.size = config.size ?? 3;
    this.color = config.color ?? '#ffffff';
    this.maxLife = config.maxLife ?? 40; // Reduced for better performance
    this.life = 0;
    this.gravity = config.gravity ?? 0.1;
    this.opacity = 1;
    this.rotation = config.rotation ?? 0;
    this.rotationSpeed = config.rotationSpeed ?? 0;
    this.shape = config.shape ?? 'star';
  }

  update(): void {
    this.life++;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.opacity = 1 - this.life / this.maxLife;
  }

  isDead(): boolean {
    return this.life >= this.maxLife;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    // Apply rotation if specified
    if (this.rotation !== 0) {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.translate(-this.x, -this.y);
    }

    // Draw based on shape
    if (this.shape === 'rectangle') {
      drawRectangle(ctx, this.x, this.y, this.size, this.size * 1.5);
    } else if (this.shape === 'circle') {
      ctx.shadowBlur = 15; // Strong glow for circles
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Stars without shadow for better performance
      drawStar(ctx, this.x, this.y, this.size, 5);
    }

    ctx.restore();
  }
}
