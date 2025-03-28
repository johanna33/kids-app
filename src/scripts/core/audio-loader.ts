/**
 * Service for efficient audio loading and playback
 */
export class AudioLoader {
  private static instance: AudioLoader;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLAudioElement>> = new Map();
  private isEnabled: boolean = true;

  /**
   * Get the singleton instance
   */
  public static getInstance(): AudioLoader {
    if (!AudioLoader.instance) {
      AudioLoader.instance = new AudioLoader();
    }
    return AudioLoader.instance;
  }

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {
    // Check if audio is supported
    this.isEnabled = typeof Audio !== "undefined";

    // Handle cleanup on page unload
    window.addEventListener("beforeunload", () => {
      this.cleanup();
    });
  }

  /**
   * Load an audio file
   * @param src The audio file path
   */
  public loadAudio(src: string): Promise<HTMLAudioElement> {
    // Return from cache if available
    if (this.audioCache.has(src)) {
      return Promise.resolve(this.audioCache.get(src)!);
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    // Create new loading promise
    const loadingPromise = new Promise<HTMLAudioElement>((resolve, reject) => {
      if (!this.isEnabled) {
        reject(new Error("Audio is not supported in this browser"));
        return;
      }

      const audio = new Audio(src);

      audio.addEventListener(
        "canplaythrough",
        () => {
          this.audioCache.set(src, audio);
          this.loadingPromises.delete(src);
          resolve(audio);
        },
        { once: true },
      );

      audio.addEventListener(
        "error",
        () => {
          this.loadingPromises.delete(src);
          reject(new Error(`Failed to load audio: ${src}`));
        },
        { once: true },
      );

      // Start loading
      audio.load();
    });

    this.loadingPromises.set(src, loadingPromise);
    return loadingPromise;
  }

  /**
   * Play an audio file
   * @param src The audio file path
   * @param volume Optional volume (0.0 to 1.0)
   */
  public async playAudio(src: string, volume: number = 1.0): Promise<void> {
    if (!this.isEnabled) {
      console.warn("Audio is not supported in this browser");
      return;
    }

    try {
      // Load the audio if not already loaded
      const audio = await this.loadAudio(src);

      // Reset audio to beginning if it was already playing
      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, volume));

      // Play the audio
      const playPromise = audio.play();

      // Handle play promise (required for modern browsers)
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  }

  /**
   * Preload multiple audio files
   * @param sources Array of audio file paths
   */
  public preloadAudioFiles(sources: string[]): Promise<HTMLAudioElement[]> {
    return Promise.all(sources.map((src) => this.loadAudio(src)));
  }

  /**
   * Enable or disable audio
   * @param enabled Whether audio should be enabled
   */
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Check if audio is enabled
   */
  public isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    // Stop all playing audio
    this.audioCache.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    // Clear caches
    this.audioCache.clear();
    this.loadingPromises.clear();
  }
}
