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

export function drawSnowflake(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number = 0
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Add subtle glow for depth
  ctx.shadowBlur = 3;
  ctx.shadowColor = ctx.strokeStyle as string;

  // Draw main 6 arms
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const endX = Math.cos(angle) * size;
    const endY = Math.sin(angle) * size;

    // Main arm
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Add small branches for detail
    const branchSize = size * 0.3;
    const branchDist = size * 0.6;
    const branchX = Math.cos(angle) * branchDist;
    const branchY = Math.sin(angle) * branchDist;

    // Left branch
    ctx.beginPath();
    ctx.moveTo(branchX, branchY);
    ctx.lineTo(
      branchX + Math.cos(angle - Math.PI / 4) * branchSize,
      branchY + Math.sin(angle - Math.PI / 4) * branchSize
    );
    ctx.stroke();

    // Right branch
    ctx.beginPath();
    ctx.moveTo(branchX, branchY);
    ctx.lineTo(
      branchX + Math.cos(angle + Math.PI / 4) * branchSize,
      branchY + Math.sin(angle + Math.PI / 4) * branchSize
    );
    ctx.stroke();
  }

  ctx.restore();
}

export function drawBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
): void {
  // Save the original fill color
  const baseColor = ctx.fillStyle as string;

  // Main bubble with multi-layer gradient for depth
  const mainGradient = ctx.createRadialGradient(x - size * 0.25, y - size * 0.25, 0, x, y, size);
  mainGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
  mainGradient.addColorStop(0.3, baseColor);
  mainGradient.addColorStop(0.7, baseColor);
  mainGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = mainGradient;
  ctx.fill();

  // Subtle border/rim for definition
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Primary highlight (large, soft)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.35, 0, Math.PI * 2);
  ctx.fill();

  // Secondary highlight (small, bright)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(x - size * 0.4, y - size * 0.4, size * 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Reflected light on opposite side
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.arc(x + size * 0.4, y + size * 0.4, size * 0.2, 0, Math.PI * 2);
  ctx.fill();
}

export function drawCross(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
): void {
  // Draw simple 4-pointed cross/plus shape
  const halfSize = size / 2;
  const thickness = size * 0.3;

  // Vertical bar
  ctx.fillRect(x - thickness / 2, y - halfSize, thickness, size);
  // Horizontal bar
  ctx.fillRect(x - halfSize, y - thickness / 2, size, thickness);
}

export function drawOval(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(width / height, 1);
  ctx.beginPath();
  ctx.arc(0, 0, height, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
