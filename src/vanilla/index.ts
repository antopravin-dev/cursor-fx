import { CursorFXEngine, createFairyDustEffect, createSparkleEffect, createConfettiEffect, createRetroCRTEffect, createSnowEffect, createBubbleEffect } from '../core';

export type CursorEffectType = 'fairyDust' | 'sparkle' | 'confetti' | 'retroCRT' | 'snow' | 'bubble';

export interface InitCursorFXOptions {
  effect?: CursorEffectType;
  colors?: string[];
  particleCount?: number;
  particleSize?: number;
  gravity?: number;
  maxLife?: number;
  velocity?: number;
}

export interface CursorFXInstance {
  destroy: () => void;
}

/**
 * Initialize cursor effects with a single function call.
 * Creates canvas, appends to body, and starts the fairy dust effect.
 *
 * @param options - Configuration options for the effect
 * @returns Instance with destroy() method for cleanup
 *
 * @example
 * ```ts
 * const fx = initCursorFX({
 *   colors: ['#FFD700', '#FF69B4'],
 *   particleCount: 5
 * });
 *
 * // Later, to cleanup:
 * fx.destroy();
 * ```
 */
export function initCursorFX(options: InitCursorFXOptions = {}): CursorFXInstance {
  // Check for prefers-reduced-motion
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Return no-op instance if user prefers reduced motion
      return { destroy: () => {} };
    }
  }

  // Create engine (automatically creates and appends canvas with fixed positioning)
  const engine = new CursorFXEngine();

  // Extract effect type from options
  const { effect = 'fairyDust', ...effectOptions } = options;

  // Reduce particle count for better performance
  const optimizedOptions = {
    particleCount: 2, // Reduced from default 3
    ...effectOptions,
  };

  // Select effect based on type
  const selectedEffect =
    effect === 'confetti'
      ? createConfettiEffect(optimizedOptions)
      : effect === 'sparkle'
      ? createSparkleEffect(optimizedOptions)
      : effect === 'retroCRT'
      ? createRetroCRTEffect(optimizedOptions)
      : effect === 'snow'
      ? createSnowEffect(optimizedOptions)
      : effect === 'bubble'
      ? createBubbleEffect(optimizedOptions)
      : createFairyDustEffect(optimizedOptions);

  // Start the engine with the effect
  engine.start(selectedEffect);

  return {
    destroy: () => engine.destroy(),
  };
}

// Export types for TypeScript users
export type { EffectOptions } from '../core/types';
