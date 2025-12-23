import type { ParticleConfig } from './types';
import { drawStar, drawRectangle, drawSnowflake, drawBubble, drawCross, drawOval } from './utils';

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
  shape: 'star' | 'rectangle' | 'circle' | 'snowflake' | 'bubble' | 'cross' | 'oval';
  wobbleAmplitude: number;
  wobbleSpeed: number;
  wobblePhase: number;
  windDrift: number;
  image?: HTMLImageElement;

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
    this.wobbleAmplitude = config.wobbleAmplitude ?? 0;
    this.wobbleSpeed = config.wobbleSpeed ?? 0;
    this.wobblePhase = Math.random() * Math.PI * 2; // Random starting phase
    this.windDrift = config.windDrift ?? 0;
    this.image = config.image;
  }

  update(): void {
    this.life++;
    this.vy += this.gravity;

    // Apply wobble (for bubbles)
    if (this.wobbleAmplitude > 0) {
      this.wobblePhase += this.wobbleSpeed;
      this.x += this.vx + Math.sin(this.wobblePhase) * this.wobbleAmplitude;
    } else {
      this.x += this.vx;
    }

    // Apply wind drift (for snowflakes)
    if (this.windDrift > 0) {
      // Smooth Perlin-like drift using sine waves at different frequencies
      const drift = Math.sin(this.life * 0.05) * this.windDrift * 0.3 +
                    Math.sin(this.life * 0.02) * this.windDrift * 0.7;
      this.x += drift;
    }

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

    // If image is available, render image instead of shape
    if (this.image && this.image.complete) {
      // Enable high-quality image smoothing for better rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgSize = this.size * 2.5; // Larger multiplier for bigger bubbles
      ctx.translate(this.x, this.y);
      if (this.rotation !== 0) {
        ctx.rotate(this.rotation);
      }
      ctx.drawImage(
        this.image,
        -imgSize / 2,
        -imgSize / 2,
        imgSize,
        imgSize
      );
      ctx.restore();
      return;
    }

    // Fallback to shape rendering
    ctx.fillStyle = this.color;

    // Draw based on shape
    switch (this.shape) {
      case 'rectangle':
        if (this.rotation !== 0) {
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.translate(-this.x, -this.y);
        }
        drawRectangle(ctx, this.x, this.y, this.size, this.size * 1.5);
        break;

      case 'circle':
        ctx.shadowBlur = 15; // Strong glow for circles
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'snowflake':
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        drawSnowflake(ctx, this.x, this.y, this.size, this.rotation);
        break;

      case 'bubble':
        drawBubble(ctx, this.x, this.y, this.size);
        break;

      case 'cross':
        ctx.shadowBlur = 18; // Strong glow for fairy dust
        ctx.shadowColor = this.color;
        drawCross(ctx, this.x, this.y, this.size);
        break;

      case 'oval':
        ctx.shadowBlur = 12; // Moderate glow for CRT phosphor
        ctx.shadowColor = this.color;
        drawOval(ctx, this.x, this.y, this.size * 2, this.size);
        break;

      default: // star
        drawStar(ctx, this.x, this.y, this.size, 5);
        break;
    }

    ctx.restore();
  }
}
