# ✨ Cursor FX

Beautiful, customizable cursor particle effects for React and vanilla JavaScript. Create magical experiences with effects like bubbles, snow, sparkles, and more!

[![NPM Version](https://img.shields.io/npm/v/cursor-fx.svg)](https://www.npmjs.com/package/cursor-fx)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**[🎮 Live Demo](https://www.antoprav.in/work/cursor-fx)** | **[📖 Documentation](#-api-reference)** | **[⭐ GitHub](https://github.com/antopravin-dev/cursor-fx)**

<div align="center">

![Cursor FX Demo](./assets/cursor-fx-preview.mp4)

**✨ Experience magical cursor effects with 6 stunning built-in animations ✨**

</div>

## ✨ Features

- 🎨 **6 Built-in Effects**: Bubbles, Snow, Fairy Dust, Sparkle, Confetti, Retro CRT
- ⚡ **High Performance**: Optimized canvas rendering with smart throttling
- 🎯 **TypeScript Support**: Full type definitions included
- 📦 **Tiny Bundle**: Lightweight with minimal dependencies
- 🎭 **Customizable**: Colors, size, speed, and behavior all configurable
- ⚛️ **React Ready**: Dedicated React components with hooks
- 🌐 **Vanilla JS**: Works with any framework or no framework
- 🖼️ **Image Support**: Use PNG assets for realistic effects

## 📦 Installation

```bash
# npm
npm install cursor-fx

# yarn
yarn add cursor-fx

# pnpm
pnpm add cursor-fx
```

## 🚀 Quick Start

### React

```tsx
import { CursorFX } from 'cursor-fx/react';

function App() {
  return (
    <>
      <CursorFX effect="bubble" />
      <YourContent />
    </>
  );
}
```

### Vanilla JavaScript

```javascript
import { initCursorFX } from 'cursor-fx/vanilla';

const fx = initCursorFX({
  effect: 'snow',
  particleCount: 2
});

// Later, to clean up:
fx.destroy();
```

### CDN (No Build Step)

Use directly in your HTML without any build tools:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Hello World</h1>

  <!-- Load from CDN -->
  <script src="https://unpkg.com/cursor-fx@latest/dist/cdn/cursor-fx.min.js"></script>

  <script>
    // Use the global CursorFX object
    const fx = CursorFX.initCursorFX({
      effect: 'bubble'
    });
  </script>
</body>
</html>
```

**CDN Options:**
- **unpkg**: `https://unpkg.com/cursor-fx@latest/dist/cdn/cursor-fx.min.js`
- **jsdelivr**: `https://cdn.jsdelivr.net/npm/cursor-fx@latest/dist/cdn/cursor-fx.min.js`

**Available via global `CursorFX` object:**
- `CursorFX.initCursorFX(options)` - Initialize effects
- `CursorFX.ImageLoader` - Preload images (optional)

## 🎨 Available Effects

### 🫧 Bubble
Floating soap bubbles that drift upward with a smooth pop-up animation.

```tsx
<CursorFX effect="bubble" />
```

**Features:**
- Transparent, realistic bubble rendering
- Gentle upward float with wobble physics
- Smooth scale-up animation on spawn (pops from 30% to 100% size)
- Variable bubble sizes (37-112px)

---

### ❄️ Snow
Delicate snowflakes that fall and drift with wind.

```tsx
<CursorFX effect="snow" />
```

**Features:**
- Rotating snowflakes with 6-armed crystalline structure
- Wind drift using smooth sine wave physics
- White glow for visibility
- Dual mode: PNG images or optimized canvas drawing

---

### ✨ Fairy Dust
Golden magical particles that float upward.

```tsx
<CursorFX effect="fairyDust" />
```

**Features:**
- Golden glow effect (shadowBlur: 18px)
- Cross/plus shape particles
- Upward floating motion (negative gravity)
- Perfect for magical themes

---

### ⭐ Sparkle
Quick, colorful sparkles that burst and fade.

```tsx
<CursorFX effect="sparkle" />
```

**Features:**
- Rainbow colored particles
- Fast, energetic movement
- Short lifetime (20 frames) for clean trails
- Star-shaped particles

---

### 🎉 Confetti
Celebratory confetti that falls from cursor.

```tsx
<CursorFX effect="confetti" />
```

**Features:**
- Party color palette
- Rectangle particles with rotation
- Realistic falling physics
- Perfect for celebrations

---

### 🖥️ Retro CRT
Phosphor green glow like old computer terminals.

```tsx
<CursorFX effect="retroCRT" />
```

**Features:**
- Classic phosphor green colors
- Circular particles with strong glow
- Stationary particles (zero gravity)
- Nostalgic terminal aesthetic

## ⚙️ Configuration

All effects support extensive customization:

```tsx
<CursorFX
  effect="bubble"
  particleCount={3}
  colors={['#FF6B6B', '#4ECDC4', '#FFE66D']}
/>
```

### Common Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `effect` | `CursorEffectType` | Effect name | Required |
| `particleCount` | `number` | Particles per spawn | Effect-specific |
| `colors` | `string[]` | Particle colors | Effect-specific |
| `particleSize` | `number` | Base particle size | Effect-specific |
| `enabled` | `boolean` | Enable/disable | `true` (React) |

### Advanced Options

```typescript
interface EffectOptions {
  colors?: string[];          // Particle colors
  particleCount?: number;     // Particles per spawn
  particleSize?: number;      // Base size
  gravity?: number;           // Vertical acceleration
  maxLife?: number;           // Lifetime in frames
  velocity?: number;          // Movement speed
  throttle?: number;          // Ms between spawns
  minMoveDistance?: number;   // Min cursor movement
}
```

### Effect-Specific Defaults

See [EFFECT_DEFAULTS.md](./EFFECT_DEFAULTS.md) for complete default values.

**Quick Reference:**

```typescript
// All effects work with no options:
<CursorFX effect="bubble" />    // Uses all defaults
<CursorFX effect="snow" />      // Uses all defaults

// Or customize only what you need:
<CursorFX effect="bubble" particleCount={5} />
<CursorFX effect="snow" colors={['#FFFFFF']} />
```

## 📚 API Reference

### React Component

```tsx
import { CursorFX } from 'cursor-fx/react';

<CursorFX
  enabled={true}
  effect="bubble"
  particleCount={2}
  colors={['#FFD700', '#FF69B4']}
/>
```

**Props:**
- `enabled?: boolean` - Enable/disable effect
- `effect: CursorEffectType` - Effect name
- All `EffectOptions` are also valid props

### Vanilla JS

```javascript
import { initCursorFX } from 'cursor-fx/vanilla';

const fx = initCursorFX({
  effect: 'snow',
  particleCount: 3,
  colors: ['#FFFFFF', '#E0FFFF']
});

// Clean up when done
fx.destroy();
```

### Core Engine (Advanced)

For advanced use cases, use the core engine directly:

```javascript
import {
  CursorFXEngine,
  createBubbleEffect,
  ImageLoader
} from 'cursor-fx';

// Preload images (optional)
await ImageLoader.loadBubbles('/bubbles');
await ImageLoader.loadSnowflakes('/snowflakes');

// Create engine and effect
const engine = new CursorFXEngine();
const effect = createBubbleEffect({
  particleCount: 2,
  colors: ['#ADD8E6']
});

engine.start(effect);

// Later
engine.stop();
engine.destroy();
```

## 🖼️ Using Image Assets

The **Bubble** and **Snow** effects support PNG images for photorealistic quality. If images aren't loaded, they automatically fall back to canvas-drawn shapes.

### Setting Up Image Assets

**1. Copy the images to your public directory:**

The package includes high-quality PNG assets. Copy them from `node_modules/cursor-fx/dist/bubbles/` and `node_modules/cursor-fx/dist/snowflakes/` to your project's public directory:

```bash
# Example structure
public/
  bubbles/
    soap_bubbles_1.png
    soap_bubble_2.png
    soap_bubble_3.png
  snowflakes/
    snow_flake_1.png
    snow_flake_2.png
```

**2. Preload images before using the effects:**

### React Example

```tsx
import { useEffect } from 'react';
import { CursorFX, ImageLoader } from 'cursor-fx/react';

function App() {
  // Preload images on mount
  useEffect(() => {
    ImageLoader.loadBubbles('/bubbles')
      .then(() => console.log('✓ Bubble images loaded'))
      .catch(err => console.warn('Failed to load bubbles:', err));

    ImageLoader.loadSnowflakes('/snowflakes')
      .then(() => console.log('✓ Snowflake images loaded'))
      .catch(err => console.warn('Failed to load snowflakes:', err));
  }, []);

  return <CursorFX effect="bubble" />;
}
```

### Vanilla JavaScript Example

```javascript
import { initCursorFX, ImageLoader } from 'cursor-fx/vanilla';

// Preload images first
Promise.all([
  ImageLoader.loadBubbles('/bubbles'),
  ImageLoader.loadSnowflakes('/snowflakes')
])
  .then(() => {
    console.log('✓ All images loaded');

    // Initialize effect after images are ready
    const fx = initCursorFX({ effect: 'bubble' });
  })
  .catch(err => {
    console.warn('Failed to load images:', err);
    // Effect will still work with canvas fallback
    const fx = initCursorFX({ effect: 'bubble' });
  });
```

### CDN Example

```html
<script src="https://unpkg.com/cursor-fx@latest/dist/cdn/cursor-fx.min.js"></script>

<script>
  // Preload images from your server
  CursorFX.ImageLoader.loadBubbles('/bubbles')
    .then(() => {
      // Initialize bubble effect with images
      const fx = CursorFX.initCursorFX({ effect: 'bubble' });
    });
</script>
```

### ImageLoader API

```typescript
// Load bubble images (expects 3 PNGs in the directory)
ImageLoader.loadBubbles(basePath?: string): Promise<HTMLImageElement[]>

// Load snowflake images (expects 2+ PNGs in the directory)
ImageLoader.loadSnowflakes(basePath?: string): Promise<HTMLImageElement[]>

// Load a single image
ImageLoader.loadImage(src: string): Promise<HTMLImageElement>

// Check if any images are loaded
ImageLoader.isLoaded(): boolean

// Clear all cached images
ImageLoader.clear(): void
```

**Required file names:**
- Bubbles: `soap_bubbles_1.png`, `soap_bubble_2.png`, `soap_bubble_3.png`
- Snowflakes: `snow_flake_1.png`, `snow_flake_2.png`

**Fallback Behavior:**
If images fail to load or aren't preloaded, bubble and snow effects automatically use optimized canvas rendering instead. Your effects will always work!

**Included Assets:**
- 3 bubble variations (~148KB total)
- 2 snowflake variations (~140KB total)

Assets are bundled at `dist/bubbles/` and `dist/snowflakes/`.

## 🎨 Customizing Colors

Each effect has themed default colors, but you can easily customize:

```tsx
// Transparent pink bubbles
<CursorFX
  effect="bubble"
  colors={[
    'rgba(255, 192, 203, 0.4)', // Pink
    'rgba(255, 182, 193, 0.4)', // Light pink
  ]}
/>

// Blue-tinted snow
<CursorFX
  effect="snow"
  colors={['#E0FFFF', '#F0F8FF', '#F5FFFA']}
/>

// Custom sparkle colors
<CursorFX
  effect="sparkle"
  colors={['#FF0000', '#00FF00', '#0000FF']}
/>
```

## 📱 Performance Tips

1. **Reduce Spawn Rate**: Increase `throttle` and `minMoveDistance`

```tsx
<CursorFX
  effect="bubble"
  throttle={200}         // 200ms between spawns
  minMoveDistance={20}   // Spawn only after 20px movement
/>
```

2. **Lower Particle Count**: Reduce particles per spawn

```tsx
<CursorFX effect="snow" particleCount={1} />
```

3. **Shorter Lifetime**: Particles disappear faster

```tsx
<CursorFX effect="sparkle" maxLife={15} />
```

4. **Disable on Mobile**: Conditional rendering

```tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

<CursorFX effect="bubble" enabled={!isMobile} />
```

## 🔧 Advanced Usage

### Multiple Effects with Switching

```tsx
function App() {
  const [effect, setEffect] = useState('bubble');

  return (
    <>
      <CursorFX effect={effect} />

      <button onClick={() => setEffect('snow')}>Snow</button>
      <button onClick={() => setEffect('bubble')}>Bubble</button>
      <button onClick={() => setEffect('confetti')}>Confetti</button>
    </>
  );
}
```

### Dynamic Configuration

```tsx
const [config, setConfig] = useState({
  particleCount: 2,
  colors: ['#FFD700', '#FFC700']
});

<CursorFX effect="fairyDust" {...config} />

<button onClick={() => setConfig({...config, particleCount: 5})}>
  More Particles
</button>
```

### Conditional Effects

```tsx
<CursorFX
  effect="confetti"
  enabled={isCelebrating}
  particleCount={8}
/>
```

## 🌐 Browser Compatibility

Works in all modern browsers that support:
- Canvas API
- ES2020+
- RequestAnimationFrame

**Mobile Support:** Touch events fully supported.

**Performance Optimizations:**
- Max 500 particles to prevent lag
- Smart throttling (~60fps)
- Wind drift with smooth Perlin-like noise
- Optimized canvas rendering (single-path snowflakes = 18x faster)

## 📦 Bundle Size

Optimized for minimal impact:
- Core: ~6KB (minified + gzipped)
- React: ~7KB (minified + gzipped)
- Vanilla: ~6KB (minified + gzipped)

**Dependencies:**
- Zero runtime dependencies
- React is a peer dependency (optional)

## 🎯 TypeScript

Full TypeScript support included:

```typescript
import type { CursorEffectType, EffectOptions } from 'cursor-fx';
import type { CursorFXProps } from 'cursor-fx/react';

const effect: CursorEffectType = 'bubble';

const options: EffectOptions = {
  particleCount: 3,
  colors: ['#FF0000']
};
```

## 📂 Examples

Working examples included:
- `examples/react/` - Vite + React demo
- `examples/vanilla/` - Plain HTML demo

Run examples:
```bash
cd examples/react
npm install
npm run dev
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Your Name]

## 🙏 Acknowledgments

Built with:
- TypeScript
- React (peer dependency)
- HTML5 Canvas API
- tsup for bundling

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/cursor-fx)
- [GitHub Repository](https://github.com/antopravin-dev/cursor-fx)
- [Documentation](./EFFECT_DEFAULTS.md)

---

**Made with ✨ by [Anto Pravin C](https://github.com/antopravin-dev)**
