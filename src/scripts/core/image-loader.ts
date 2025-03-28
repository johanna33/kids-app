/**
 * Service for lazy loading images
 */
export class ImageLoader {
  private static instance: ImageLoader;
  private observer: IntersectionObserver;
  private loadedImages: Set<string> = new Set();
  private lowQualityPlaceholders: Map<string, string> = new Map();

  /**
   * Get the singleton instance
   */
  public static getInstance(): ImageLoader {
    if (!ImageLoader.instance) {
      ImageLoader.instance = new ImageLoader();
    }
    return ImageLoader.instance;
  }

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    // Create intersection observer for lazy loading
    this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
      rootMargin: "50px 0px",
      threshold: 0.01,
    });

    // Handle cleanup on page unload
    window.addEventListener("beforeunload", () => {
      this.observer.disconnect();
    });
  }

  /**
   * Handle intersection events
   */
  private onIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement;
        const src = lazyImage.dataset.src;

        if (src) {
          this.loadImage(lazyImage, src);
          this.observer.unobserve(lazyImage);
        }
      }
    });
  }

  /**
   * Load an image
   */
  private loadImage(imgElement: HTMLImageElement, src: string): void {
    // Create a new image to load in background
    const img = new Image();

    // Set up load event
    img.onload = () => {
      imgElement.src = src;
      imgElement.classList.add("loaded");
      this.loadedImages.add(src);

      // Remove data-src to indicate it's loaded
      delete imgElement.dataset.src;
    };

    // Set up error event
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      // Keep the placeholder or set a fallback
      imgElement.classList.add("error");
    };

    // Start loading
    img.src = src;
  }

  /**
   * Create a lazy-loaded image element
   */
  public createLazyImage(
    src: string,
    alt: string,
    className: string = "",
    placeholderColor: string = "#f0f0f0",
  ): HTMLImageElement {
    const imgElement = document.createElement("img");

    // Set basic attributes
    imgElement.alt = alt;
    if (className) {
      imgElement.className = className;
    }

    // Check if image is already loaded
    if (this.loadedImages.has(src)) {
      imgElement.src = src;
      imgElement.classList.add("loaded");
    } else {
      // Set placeholder and data-src
      imgElement.src =
        this.getLowQualityPlaceholder(src) ||
        `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' width='40' height='40'%3E%3Crect width='1' height='1' fill='${placeholderColor.replace("#", "%23")}' /%3E%3C/svg%3E`;
      imgElement.dataset.src = src;
      imgElement.classList.add("lazy");

      // Start observing
      this.observer.observe(imgElement);
    }

    return imgElement;
  }

  /**
   * Get or create a low quality placeholder
   */
  private getLowQualityPlaceholder(src: string): string | undefined {
    return this.lowQualityPlaceholders.get(src);
  }

  /**
   * Set a low quality placeholder for an image
   */
  public setLowQualityPlaceholder(src: string, placeholderSrc: string): void {
    this.lowQualityPlaceholders.set(src, placeholderSrc);
  }

  /**
   * Preload an image without displaying it
   */
  public preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Skip if already loaded
      if (this.loadedImages.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(src);
        resolve();
      };
      img.onerror = () => {
        reject(new Error(`Failed to preload image: ${src}`));
      };
      img.src = src;
    });
  }

  /**
   * Preload multiple images
   */
  public preloadImages(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map((src) => this.preloadImage(src)));
  }
}
