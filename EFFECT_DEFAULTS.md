# Cursor FX - Effect Default Values

All effects can be used without passing any options. Below are the default values for each effect:

## 🫧 Bubble Effect
```typescript
{
  colors: ['rgba(173, 216, 230, 0.4)', 'rgba(135, 206, 235, 0.4)', ...], // Light blue transparent
  particleCount: 1,
  gravity: -0.02,
  maxLife: 180,
  velocity: 0.2,
  throttle: 150,
  minMoveDistance: 15
}
```

## ❄️ Snow Effect  
```typescript
{
  colors: ['#FFFFFF', '#F0F8FF', '#E6F3FF', '#F5F5F5'], // White tones
  particleCount: 1,
  particleSize: 7,
  gravity: 0.12,
  maxLife: 150,
  velocity: 0.4,
  throttle: 120,
  minMoveDistance: 12
}
```

## ✨ Fairy Dust Effect
```typescript
{
  colors: ['#FFD700', '#FFC700', '#FFB700', '#FFED4E', '#F4E04D'], // Gold tones
  particleCount: 2,
  particleSize: 6,
  gravity: -0.05,
  maxLife: 40,
  velocity: 3
}
```

## ⭐ Sparkle Effect
```typescript
{
  colors: ['#FFD700', '#FF69B4', '#00CED1', '#9370DB'], // Rainbow
  particleCount: 1,
  particleSize: 6,
  gravity: 0.1,
  maxLife: 20,
  velocity: 4
}
```

## 🎉 Confetti Effect
```typescript
{
  colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'], // Party colors
  particleCount: 3,
  particleSize: 4,
  gravity: 0.3,
  maxLife: 60,
  velocity: 6
}
```

## 🖥️ Retro CRT Effect
```typescript
{
  colors: ['#00FF00', '#33FF33', '#00CC00', '#00DD00'], // Phosphor green
  particleCount: 3,
  particleSize: 4,
  gravity: 0,
  maxLife: 60,
  velocity: 1
}
```

## Usage Examples

### Without options (uses all defaults):
```typescript
const snowEffect = createSnowEffect();
const bubbleEffect = createBubbleEffect();
```

### With custom options (overrides defaults):
```typescript
const customSnow = createSnowEffect({
  particleCount: 3,  // Override
  colors: ['#FFFFFF'] // Override
  // Other values use defaults
});
```

### Partial overrides work perfectly:
```typescript
const bigBubbles = createBubbleEffect({
  particleSize: 30 // Only override size, rest use defaults
});
```
