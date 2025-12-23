// Image loader for bubble assets
export class ImageLoader {
  private static images: Map<string, HTMLImageElement> = new Map();
  private static loading: Map<string, Promise<HTMLImageElement>> = new Map();

  static async loadImage(src: string): Promise<HTMLImageElement> {
    // Return cached image if already loaded
    if (this.images.has(src)) {
      return this.images.get(src)!;
    }

    // Return existing promise if currently loading
    if (this.loading.has(src)) {
      return this.loading.get(src)!;
    }

    // Create new loading promise
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(src, img);
        this.loading.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });

    this.loading.set(src, loadPromise);
    return loadPromise;
  }

  static async loadBubbles(basePath: string = '/bubbles'): Promise<HTMLImageElement[]> {
    const bubblePaths = [
      `${basePath}/soap_bubbles_1.png`,
      `${basePath}/soap_bubble_2.png`,
      `${basePath}/soap_bubble_3.png`,
    ];

    try {
      return await Promise.all(bubblePaths.map(path => this.loadImage(path)));
    } catch (error) {
      console.warn('Failed to load some bubble images, falling back to canvas rendering', error);
      return [];
    }
  }

  static getRandomBubble(): HTMLImageElement | null {
    const images = Array.from(this.images.values());
    if (images.length === 0) return null;
    return images[Math.floor(Math.random() * images.length)];
  }

  static isLoaded(): boolean {
    return this.images.size > 0;
  }

  static clear(): void {
    this.images.clear();
    this.loading.clear();
  }
}
