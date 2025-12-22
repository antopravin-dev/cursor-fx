import { Particle } from '../particle';
import { randomColor } from '../utils';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  '#FFFFFF', // Pure white
  '#F0F8FF', // Alice blue
  '#E6F3FF', // Light blue white
  '#F5F5F5', // White smoke
];

export function createSnowEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 3,
    particleSize = 4,
    gravity = 0.15, // Gentle falling
    maxLife = 80, // Long lifetime for slow fall
    velocity = 1.5, // Slow drift
  } = options;

  return {
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * velocity, // Gentle horizontal drift
            vy: Math.random() * 0.5, // Slight downward initial velocity
            size: Math.random() * particleSize + 1, // Variable snowflake sizes
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 30,
            gravity,
            shape: 'circle',
          })
        );
      }

      return particles;
    },
  };
}
