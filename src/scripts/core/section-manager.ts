import { contentSections, welcomeScreen } from './dom-elements';

/**
 * Interface for section modules
 */
export interface SectionModule {
    initialize: () => void;
    cleanup?: () => void;
}

/**
 * Manages section loading, initialization, and cleanup
 */
export class SectionManager {
    private static instance: SectionManager;
    private currentSection: string | null = null;
    private loadedSections: Map<string, SectionModule> = new Map();
    private initializationPromises: Map<string, Promise<SectionModule>> = new Map();

    /**
     * Get the singleton instance
     */
    public static getInstance(): SectionManager {
        if (!SectionManager.instance) {
            SectionManager.instance = new SectionManager();
        }
        return SectionManager.instance;
    }

    /**
     * Private constructor for singleton pattern
     */
    private constructor() {}

    /**
     * Switch to a different section
     * @param sectionName The section to switch to, or undefined for welcome screen
     */
    public async switchSection(sectionName: string | undefined): Promise<void> {
        console.log(`Switching to section: ${sectionName || 'welcome'}`);
        
        // Clean up current section if it exists and has a cleanup method
        if (this.currentSection && this.loadedSections.has(this.currentSection)) {
            const currentModule = this.loadedSections.get(this.currentSection);
            currentModule?.cleanup?.();
        }

        // Hide all sections
        welcomeScreen.classList.remove('active');
        contentSections.forEach(section => section.classList.remove('active'));

        // Show welcome screen if no section specified
        if (!sectionName) {
            welcomeScreen.classList.add('active');
            this.currentSection = null;
            return;
        }

        // Show and initialize the requested section
        const selectedSection = document.getElementById(`${sectionName}-section`);
        if (selectedSection) {
            selectedSection.classList.add('active');
            try {
                await this.loadAndInitializeSection(sectionName);
                this.currentSection = sectionName;
            } catch (error) {
                console.error(`Error loading section ${sectionName}:`, error);
                welcomeScreen.classList.add('active');
                this.currentSection = null;
            }
        } else {
            console.error(`Section element #${sectionName}-section not found`);
            welcomeScreen.classList.add('active');
            this.currentSection = null;
        }
    }

    /**
     * Lazy load and initialize a section
     * @param sectionName The section name to load
     */
    private async loadAndInitializeSection(sectionName: string): Promise<SectionModule> {
        if (this.loadedSections.has(sectionName)) {
            return this.loadedSections.get(sectionName)!;
        }
        
        if (this.initializationPromises.has(sectionName)) {
            return this.initializationPromises.get(sectionName)!;
        }
        
        const loadingPromise = this.importAndInitializeSection(sectionName);
        this.initializationPromises.set(sectionName, loadingPromise);
        
        try {
            const module = await loadingPromise;
            this.loadedSections.set(sectionName, module);
            this.initializationPromises.delete(sectionName);
            return module;
        } catch (error) {
            this.initializationPromises.delete(sectionName);
            throw error;
        }
    }

    /**
     * Import a section module dynamically and initialize it
     * @param sectionName The section name to import
     */
    private async importAndInitializeSection(sectionName: string): Promise<SectionModule> {
        const sectionImports: Record<string, () => Promise<any>> = {
            alphabet: () => import('../sections/alphabet'),
            numbers: () => import('../sections/numbers'),
            colors: () => import('../sections/colors'),
            shapes: () => import('../sections/shapes'),
            positions: () => import('../sections/positions'),
            emotions: () => import('../sections/emotions'),
            bodyParts: () => import('../sections/bodyParts'),
            animals: () => import('../sections/animals')
        };

        try {
            const module = await sectionImports[sectionName]();
            if (typeof module.initialize === 'function') {
                module.initialize();
                return {
                    initialize: module.initialize,
                    cleanup: module.cleanup
                };
            } else {
                throw new Error(`Section module ${sectionName} does not have an initialize function`);
            }
        } catch (error) {
            console.error(`Failed to import section ${sectionName}:`, error);
            throw error;
        }
    }

    /**
     * Preload a section without displaying it
     * @param sectionName The section to preload
     */
    public async preloadSection(sectionName: string): Promise<void> {
        return this.loadAndInitializeSection(sectionName).then(() => {
            console.log(`Section ${sectionName} preloaded successfully`);
        });
    }

    /**
     * Get the current active section name
     */
    public getCurrentSection(): string | null {
        return this.currentSection;
    }
}