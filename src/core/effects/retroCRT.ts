import { Particle } from '../particle';
import { randomColor } from '../utils';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  '#00FF00', // Classic phosphor green
  '#33FF33', // Bright phosphor green
  '#00CC00', // Medium phosphor green
  '#00DD00', // Light phosphor green
];

export function createRetroCRTEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 3,
    particleSize = 4, // Slightly larger for better visibility
    gravity = 0, // No gravity - phosphor glows in place
    maxLife = 60, // Longer persistence like real phosphor
    velocity = 1, // Very slow movement for authentic glow
  } = options;

  return {
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * velocity,
            vy: (Math.random() - 0.5) * velocity,
            size: Math.random() * particleSize + 2,
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 15,
            gravity,
            shape: 'circle', // Back to circles with strong glow
          })
        );
      }

      return particles;
    },
  };
}
