import { Particle } from '../particle';
import { randomColor } from '../utils';
import type { Effect, EffectOptions } from '../types';

const DEFAULT_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Turquoise
  '#FFE66D', // Yellow
  '#95E1D3', // Mint
  '#F38181', // Pink
  '#AA96DA', // Purple
  '#FCBAD3', // Light Pink
  '#A8D8EA', // Sky Blue
];

export function createConfettiEffect(options: EffectOptions = {}): Effect {
  const {
    colors = DEFAULT_COLORS,
    particleCount = 3,
    particleSize = 4,
    gravity = 0.3, // Stronger gravity for falling effect
    maxLife = 60, // Longer lifetime for confetti
    velocity = 6,
  } = options;

  return {
    onMouseMove(x: number, y: number): Particle[] {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * velocity,
            vy: (Math.random() - 1) * velocity * 0.5, // Bias upward initially
            size: Math.random() * particleSize + 3,
            color: randomColor(colors),
            maxLife: maxLife + Math.random() * 20,
            gravity,
            rotation: Math.random() * Math.PI * 2, // Random initial rotation
            rotationSpeed: (Math.random() - 0.5) * 0.2, // Rotation speed
            shape: 'rectangle',
          })
        );
      }

      return particles;
    },
  };
}
