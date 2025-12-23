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
    particleCount = 1, // One snowflake at a time
    particleSize = 6, // Slightly bigger for visibility
    gravity = 0.05, // Very gentle falling (was 0.08)
    maxLife = 200, // Longer lifetime for slow, graceful fall (was 150)
    velocity = 0.3, // Minimal base drift (was 0.8)
    throttle = 120, // Spawn every 120ms - less frequent
    minMoveDistance = 12, // Only spawn when cursor moves 12px
  } = options;

  return {
    throttle,
    minMoveDistance,
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * velocity, // Minimal base drift
            vy: Math.random() * 0.1 + 0.05, // Very slow downward initial velocity
            size: Math.random() * particleSize + 2, // Variable sizes (2-8px)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 80,
            gravity,
            rotation: Math.random() * Math.PI * 2, // Random initial rotation
            rotationSpeed: (Math.random() - 0.5) * 0.008, // Very slow rotation
            shape: 'snowflake',
            windDrift: 0.8, // Gentle wind drift/sway
          })
        );
      }

      return particles;
    },
  };
}
