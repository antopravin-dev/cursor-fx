import { useState } from 'react';
import { CursorFX } from '../../../dist/react/index.mjs';
import type { CursorEffectType } from '../../../dist/react/index.mjs';

function App() {
  const [enabled, setEnabled] = useState(true);
  const [effect, setEffect] = useState<CursorEffectType>('fairyDust');

  return (
    <>
      <CursorFX
        enabled={enabled}
        effect={effect}
        particleCount={2}
        particleSize={3}
        colors={
          effect === 'confetti'
            ? [
                '#FF6B6B',
                '#4ECDC4',
                '#FFE66D',
                '#95E1D3',
                '#F38181',
              ]
            : effect === 'sparkle'
            ? [
                '#FFD700',
                '#FF69B4',
                '#00CED1',
                '#FF6347',
                '#9370DB',
                '#32CD32',
                '#FF1493',
                '#00BFFF',
              ]
            : effect === 'retroCRT'
            ? [
                '#00FF00',
                '#33FF33',
                '#00CC00',
                '#00DD00',
              ]
            : effect === 'snow'
            ? [
                '#FFFFFF',
                '#F0F8FF',
                '#E6F3FF',
                '#F5F5F5',
              ]
            : effect === 'bubble'
            ? [
                '#ADD8E6',
                '#87CEEB',
                '#B0E0E6',
                '#AFEEEE',
                '#E0FFFF',
              ]
            : [
                '#FFD700',
                '#FFC700',
                '#FFB700',
                '#FFED4E',
                '#F4E04D',
              ]
        }
      />

      <div className="container">
        <h1>✨ Cursor FX React</h1>
        <p>Move your mouse to see the magic!</p>

        <div className="controls">
          <button onClick={() => setEnabled(false)}>Stop Effect</button>
          <button onClick={() => setEnabled(true)}>Start Effect</button>
        </div>

        <div className="controls">
          <button
            onClick={() => setEffect('fairyDust')}
            style={{
              backgroundColor: effect === 'fairyDust' ? '#4CAF50' : undefined
            }}
          >
            ✨ Fairy Dust
          </button>
          <button
            onClick={() => setEffect('sparkle')}
            style={{
              backgroundColor: effect === 'sparkle' ? '#4CAF50' : undefined
            }}
          >
            ⭐ Sparkle
          </button>
          <button
            onClick={() => setEffect('confetti')}
            style={{
              backgroundColor: effect === 'confetti' ? '#4CAF50' : undefined
            }}
          >
            🎉 Confetti
          </button>
          <button
            onClick={() => setEffect('retroCRT')}
            style={{
              backgroundColor: effect === 'retroCRT' ? '#4CAF50' : undefined
            }}
          >
            🖥️ Retro CRT
          </button>
          <button
            onClick={() => setEffect('snow')}
            style={{
              backgroundColor: effect === 'snow' ? '#4CAF50' : undefined
            }}
          >
            ❄️ Snow
          </button>
          <button
            onClick={() => setEffect('bubble')}
            style={{
              backgroundColor: effect === 'bubble' ? '#4CAF50' : undefined
            }}
          >
            🫧 Bubble
          </button>
        </div>

        <div className="info">
          <h2>Features</h2>
          <ul>
            <li>React hooks & components</li>
            <li>Beautiful particle effects</li>
            <li>Smooth animations</li>
            <li>Customizable colors</li>
            <li>TypeScript support</li>
          </ul>
        </div>

        <div className="code-example">
          <h2>Usage</h2>
          <pre>
{`import { CursorFX } from 'cursor-fx/react';

function App() {
  return (
    <CursorFX
      effect="fairyDust"
      effectConfig={{
        particleCount: 5,
        colors: ['#FFD700', '#FF69B4']
      }}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </>
  );
}

export default App;
