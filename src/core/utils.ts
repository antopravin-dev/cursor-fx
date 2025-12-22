export function randomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function createCanvas(container: HTMLElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);
  return canvas;
}

export function resizeCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  spikes: number = 5
): void {
  const outerRadius = size;
  const innerRadius = size * 0.4;

  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    if (i === 0) {
      ctx.moveTo(x + dx, y + dy);
    } else {
      ctx.lineTo(x + dx, y + dy);
    }
  }
  ctx.closePath();
  ctx.fill();
}

export function drawRectangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  ctx.fillRect(x - width / 2, y - height / 2, width, height);
}
