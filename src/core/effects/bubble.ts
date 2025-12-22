import { Particle } from '../particle';
import { randomColor } from '../utils';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  '#ADD8E6', // Light blue
  '#87CEEB', // Sky blue
  '#B0E0E6', // Powder blue
  '#AFEEEE', // Pale turquoise
  '#E0FFFF', // Light cyan
];

export function createBubbleEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 2,
    particleSize = 6, // Larger base size for bubbles
    gravity = -0.08, // Gentle upward float
    maxLife = 70, // Long lifetime as bubbles float up
    velocity = 2,
  } = options;

  return {
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * velocity,
            vy: -Math.random() * 2, // Upward bias
            size: Math.random() * particleSize + 2, // Random bubble sizes (2-8)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 20,
            gravity,
            shape: 'circle',
          })
        );
      }

      return particles;
    },
  };
}
