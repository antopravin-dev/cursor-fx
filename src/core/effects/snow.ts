import { Particle } from '../particle';
import { randomColor } from '../utils';
import { ImageLoader } from '../imageLoader';
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
    gravity = 0.12, // Faster falling (was 0.05)
    maxLife = 150, // Shorter lifetime for faster fall (was 200)
    velocity = 0.4, // Slightly more drift (was 0.3)
    throttle = 120, // Spawn every 120ms - less frequent
    minMoveDistance = 12, // Only spawn when cursor moves 12px
  } = options;

  return {
    throttle,
    minMoveDistance,
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const snowflakeImage = ImageLoader.getRandomSnowflake();

        // Create size variation (10-25 range for 2.5x multiplier = 25-62px actual)
        const baseSize = 10 + Math.random() * 15;

        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * velocity,
            vy: Math.random() * 0.2 + 0.1, // Slightly faster downward initial velocity
            size: baseSize, // Variable sizes (10-25)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 60,
            gravity,
            rotation: Math.random() * Math.PI * 2, // Random initial rotation
            rotationSpeed: (Math.random() - 0.5) * 0.03, // More visible rotation (was 0.008)
            shape: 'snowflake',
            windDrift: 0.8, // Gentle wind drift/sway
            image: snowflakeImage || undefined, // Use image if loaded, fallback to canvas
          })
        );
      }

      return particles;
    },
  };
}
