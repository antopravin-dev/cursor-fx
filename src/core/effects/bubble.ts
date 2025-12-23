import { Particle } from '../particle';
import { randomColor } from '../utils';
import { ImageLoader } from '../imageLoader';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  'rgba(173, 216, 230, 0.4)', // Light blue - transparent
  'rgba(135, 206, 235, 0.4)', // Sky blue - transparent
  'rgba(176, 224, 230, 0.4)', // Powder blue - transparent
  'rgba(175, 238, 238, 0.4)', // Pale turquoise - transparent
  'rgba(224, 255, 255, 0.4)', // Light cyan - transparent
];

export function createBubbleEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 1, // Spawn one bubble at a time
    gravity = -0.02, // Gentle upward buoyancy
    maxLife = 180, // Longer lifetime for slow rise
    velocity = 0.2, // Minimal base horizontal drift
    throttle = 150, // Spawn every 150ms - much less frequent
    minMoveDistance = 15, // Only spawn when cursor moves 15px
  } = options;

  return {
    throttle,
    minMoveDistance,
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const bubbleImage = ImageLoader.getRandomBubble();

        // Create more dramatic size variation (15-45 range for 2.5x multiplier = 37-112px actual)
        const baseSize = 15 + Math.random() * 30;

        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * velocity,
            vy: -Math.random() * 0.15 - 0.1, // Very slow, consistent upward
            size: baseSize, // Wide size variation (15-45)
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 60,
            gravity,
            shape: 'bubble',
            wobbleAmplitude: 0.3, // Gentle horizontal wobble
            wobbleSpeed: 0.05, // Slow wobble oscillation
            image: bubbleImage || undefined, // Use image if loaded, fallback to canvas
          })
        );
      }

      return particles;
    },
  };
}
