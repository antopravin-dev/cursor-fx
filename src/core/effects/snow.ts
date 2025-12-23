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

// ⚙️ CONFIGURATION FLAG: Switch between image-based and canvas-drawn snowflakes
const USE_SNOWFLAKE_IMAGES = true; // Set to true to use PNG images, false for canvas drawing

export function createSnowEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 1, // One snowflake at a time
    particleSize = 7, // Bigger for better visibility
    gravity = 0.12, // Faster falling
    maxLife = 150, // Shorter lifetime for faster fall
    velocity = 0.4, // Slightly more drift
    throttle = 120, // Spawn every 120ms - less frequent
    minMoveDistance = 12, // Only spawn when cursor moves 12px
  } = options;

  return {
    throttle,
    minMoveDistance,
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        // Conditionally get snowflake image based on flag
        const snowflakeImage = USE_SNOWFLAKE_IMAGES ? ImageLoader.getRandomSnowflake() : null;

        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * velocity,
            vy: Math.random() * 0.2 + 0.1, // Slightly faster downward initial velocity
            size: Math.random() * particleSize + 3, // Variable sizes (3-10px for canvas, base for images)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 60,
            gravity,
            rotation: Math.random() * Math.PI * 2, // Random initial rotation
            rotationSpeed: (Math.random() - 0.5) * 0.03, // More visible rotation
            shape: 'snowflake',
            windDrift: 0.8, // Gentle wind drift/sway
            image: snowflakeImage || undefined, // Use image if flag is true and images loaded
          })
        );
      }

      return particles;
    },
  };
}
