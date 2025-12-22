# cursor-fx

Beautiful, customizable cursor effects for React and vanilla JavaScript. Add magical fairy dust particles that follow your cursor with minimal setup.

## Installation

```bash
npm install cursor-fx
# or
pnpm add cursor-fx
# or
yarn add cursor-fx
```

## Quick Start

### React

```tsx
import { CursorFX } from 'cursor-fx/react';

function App() {
  return (
    <>
      <CursorFX />
      <YourContent />
    </>
  );
}
```

### Vanilla JavaScript

```js
import { initCursorFX } from 'cursor-fx/vanilla';

const fx = initCursorFX();

// Clean up when needed
fx.destroy();
```

## API

### React

#### `<CursorFX />` Component

```tsx
<CursorFX
  colors={['#FFD700', '#FF69B4', '#00CED1']}
  particleCount={5}
  particleSize={4}
  gravity={0.1}
  maxLife={60}
  velocity={4}
  enabled={true}
/>
```

#### `useCursorFX()` Hook

```tsx
import { useCursorFX } from 'cursor-fx/react';

function MyComponent() {
  useCursorFX({
    colors: ['#FFD700', '#FF69B4'],
    particleCount: 3,
  });

  return <div>Your content</div>;
}
```

### Vanilla JavaScript

#### `initCursorFX(options)`

```js
import { initCursorFX } from 'cursor-fx/vanilla';

const fx = initCursorFX({
  colors: ['#FFD700', '#FF69B4', '#00CED1'],
  particleCount: 5,
  particleSize: 4,
  gravity: 0.1,
  maxLife: 60,
  velocity: 4,
});

// Later...
fx.destroy();
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colors` | `string[]` | `['#FFD700', '#FF69B4', '#00CED1', '#9370DB']` | Array of hex color codes for particles |
| `particleCount` | `number` | `2` | Number of particles created per mouse move |
| `particleSize` | `number` | `3` | Size of each particle |
| `gravity` | `number` | `0.1` | Gravity effect on particles |
| `maxLife` | `number` | `40` | Particle lifetime in frames (~0.7s at 60fps) |
| `velocity` | `number` | `4` | Initial particle velocity |
| `enabled` | `boolean` | `true` | Enable/disable effect (React only) |

## Browser Compatibility

Works in all modern browsers that support:
- Canvas API
- ES2020+
- RequestAnimationFrame

**Mobile Support:** Touch events are fully supported. The effect follows touch movements on mobile devices.

**Performance:**
- Maximum of 500 particles rendered at once to prevent lag
- Throttled particle creation (~60fps) to prevent event flooding
- Automatic respect for `prefers-reduced-motion` (disables effect)
- Optimized defaults: 2 particles per move, 40 frame lifetime (~0.7s)

## Bundle Size

Tiny footprint for maximum performance:
- Core: ~4KB (ESM, minified)
- React: ~4KB (ESM, minified)
- Vanilla: ~4KB (ESM, minified)

Zero dependencies (React is a peer dependency).

## TypeScript

Full TypeScript support included. All exports are fully typed.

```tsx
import type { UseCursorFXOptions } from 'cursor-fx/react';
import type { InitCursorFXOptions } from 'cursor-fx/vanilla';
import type { EffectOptions } from 'cursor-fx';
```

## Examples

Check out the `examples/` folder for working demos:
- `examples/react` - Vite + React example
- `examples/vanilla` - Plain HTML example

## License

MIT © cursor-fx contributors
