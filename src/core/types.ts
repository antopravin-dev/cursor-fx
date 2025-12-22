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
  shape?: 'star' | 'rectangle' | 'circle';
}

export interface EffectOptions {
  colors?: string[];
  particleCount?: number;
  particleSize?: number;
  gravity?: number;
  maxLife?: number;
  velocity?: number;
}

export interface EngineOptions {
  canvas?: HTMLCanvasElement;
  container?: HTMLElement;
}

export interface Effect {
  onMouseMove: (x: number, y: number) => Particle[];
}

export type EffectFunction = (x: number, y: number, options?: EffectOptions) => void;
