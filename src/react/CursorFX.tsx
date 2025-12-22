import { useCursorFX, UseCursorFXOptions } from './useCursorFX';

export interface CursorFXProps extends UseCursorFXOptions {
  children?: React.ReactNode;
}

export function CursorFX({ children, ...options }: CursorFXProps) {
  useCursorFX(options);
  return <>{children}</>;
}
