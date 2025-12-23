import { Particle } from '../particle';
import { randomColor } from '../utils';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#00CED1', // Dark Turquoise
  '#9370DB', // Medium Purple
];

export function createSparkleEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 1, // Reduced for better performance
    particleSize = 6, // Increased from 3 for better visibility
    gravity = 0.1,
    maxLife = 20, // Further reduced for faster cleanup
    velocity = 4,
  } = options;

  return {
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * velocity,
            vy: (Math.random() - 0.5) * velocity,
            size: Math.random() * particleSize + 3, // Increased from 2 (now 3-9px)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 10, // Reduced random variation
            gravity,
          })
        );
      }

      return particles;
    },
  };
}
