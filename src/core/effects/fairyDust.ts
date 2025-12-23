import { Particle } from '../particle';
import { randomColor } from '../utils';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  '#FFD700', // Gold
  '#FFC700', // Golden Yellow
  '#FFB700', // Amber
  '#FFED4E', // Light Gold
  '#F4E04D', // Pale Gold
];

export function createFairyDustEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 2,
    particleSize = 6, // Increased from 4 for better visibility
    gravity = -0.05, // Slight upward float for magical feel
    maxLife = 40,
    velocity = 3,
  } = options;

  return {
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 15,
            y: y + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * velocity,
            vy: (Math.random() - 0.5) * velocity - 1, // Slight upward bias
            size: Math.random() * particleSize + 3, // Increased from 2 (now 3-9px)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 20,
            gravity,
            shape: 'cross',
          })
        );
      }

      return particles;
    },
  };
}
