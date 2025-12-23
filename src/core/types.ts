import type { Particle } from './particle';

export interface ParticleConfig {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  size?: number;
  color?: string;
  maxLife?: number;
  gravity?: number;
  rotation?: number;
  rotationSpeed?: number;
  shape?: 'star' | 'rectangle' | 'circle' | 'snowflake' | 'bubble' | 'cross' | 'oval';
  wobbleAmplitude?: number; // Horizontal wobble amount
  wobbleSpeed?: number; // Wobble oscillation speed
  windDrift?: number; // Wind drift amount (for snowflakes)
  image?: HTMLImageElement; // Image to render (for image-based particles)
}

export interface EffectOptions {
  colors?: string[];
  particleCount?: number;
  particleSize?: number;
  gravity?: number;
  maxLife?: number;
  velocity?: number;
  throttle?: number; // Milliseconds between particle spawns
  minMoveDistance?: number; // Minimum cursor movement distance to spawn particles
}

export interface EngineOptions {
  canvas?: HTMLCanvasElement;
  container?: HTMLElement;
}

export interface Effect {
  onMouseMove: (x: number, y: number) => Particle[];
  throttle?: number; // Milliseconds between spawns
  minMoveDistance?: number; // Minimum movement distance
}

export type EffectFunction = (x: number, y: number, options?: EffectOptions) => void;
