import { useEffect, useRef } from 'react';
import { CursorFXEngine, createFairyDustEffect } from '../core';
import type { EffectOptions } from '../core/types';

export interface UseCursorFXOptions {
  effectOptions?: EffectOptions;
  enabled?: boolean;
}

export function useCursorFX(options: UseCursorFXOptions = {}) {
  const { effectOptions = {}, enabled = true } = options;
  const engineRef = useRef<CursorFXEngine | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const engine = new CursorFXEngine();
    const effect = createFairyDustEffect(effectOptions);

    engine.start(effect);
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [effectOptions, enabled]);

  return engineRef.current;
}
