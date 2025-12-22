import { useEffect, useRef, useMemo } from 'react';
import { CursorFXEngine, createFairyDustEffect, createSparkleEffect, createConfettiEffect, createRetroCRTEffect } from '../core';

export type CursorEffectType = 'fairyDust' | 'sparkle' | 'confetti' | 'retroCRT';

export interface UseCursorFXOptions {
  effect?: CursorEffectType;
  colors?: string[];
  particleCount?: number;
  particleSize?: number;
  gravity?: number;
  maxLife?: number;
  velocity?: number;
  enabled?: boolean;
}

/**
 * React hook for cursor effects.
 * Returns a ref to attach to your canvas element.
 *
 * @param options - Configuration options for the effect
 * @returns Canvas ref to attach to <canvas> element
 *
 * @example
 * ```tsx
 * function App() {
 *   useCursorFX({
 *     colors: ['#FFD700', '#FF69B4'],
 *     particleCount: 5
 *   });
 *
 *   return <div>Your content</div>;
 * }
 * ```
 */
export function useCursorFX(options: UseCursorFXOptions = {}) {
  const {
    enabled = true,
    effect = 'fairyDust',
    colors,
    particleCount,
    particleSize,
    gravity,
    maxLife,
    velocity
  } = options;
  const engineRef = useRef<CursorFXEngine | null>(null);

  // Memoize colors array to prevent unnecessary re-renders when passed inline
  const memoizedColors = useMemo(() => colors, [colors ? JSON.stringify(colors) : undefined]);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;
    if (!enabled) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create engine (automatically creates canvas)
    const engine = new CursorFXEngine();

    // Reduce particle count for better performance
    const optimizedOptions = {
      particleCount: 2, // Reduced from default 3
      ...(memoizedColors && { colors: memoizedColors }),
      ...(particleCount !== undefined && { particleCount }),
      ...(particleSize !== undefined && { particleSize }),
      ...(gravity !== undefined && { gravity }),
      ...(maxLife !== undefined && { maxLife }),
      ...(velocity !== undefined && { velocity }),
    };

    // Select effect based on type
    const selectedEffect =
      effect === 'confetti'
        ? createConfettiEffect(optimizedOptions)
        : effect === 'sparkle'
        ? createSparkleEffect(optimizedOptions)
        : effect === 'retroCRT'
        ? createRetroCRTEffect(optimizedOptions)
        : createFairyDustEffect(optimizedOptions);

    // Start the effect
    engine.start(selectedEffect);
    engineRef.current = engine;

    // Cleanup on unmount
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [enabled, effect, memoizedColors, particleCount, particleSize, gravity, maxLife, velocity]);

  return engineRef.current;
}

/**
 * CursorFX component for React.
 * Simple wrapper over useCursorFX hook.
 *
 * @param props - Configuration options for the effect
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <>
 *       <CursorFX
 *         colors={['#FFD700', '#FF69B4']}
 *         particleCount={5}
 *       />
 *       <YourContent />
 *     </>
 *   );
 * }
 * ```
 */
export function CursorFX(props: UseCursorFXOptions) {
  useCursorFX(props);
  return null;
}

// Export types for TypeScript users
export type { EffectOptions } from '../core/types';
