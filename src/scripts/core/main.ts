import { homeButton, navButtons } from "./dom-elements";
import { SectionManager } from "./section-manager";
import { AudioLoader } from "./audio-loader";
import { ImageLoader } from "./image-loader";

/**
 * Initialize the app
 */
async function initApp(): Promise<void> {
    console.log('Initializing preschool learning app...');
    
    // Initialize services
    const sectionManager = SectionManager.getInstance();
    const audioLoader = AudioLoader.getInstance();
    const imageLoader = ImageLoader.getInstance();
    
    // Add event listener to home button
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            sectionManager.switchSection(undefined);
        });
    }

    // Add event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = (button as HTMLElement).dataset.section;
            if (section) {
                sectionManager.switchSection(section);
            }
        });
    });

    // Add mascot interaction - the owl
    const mascot = document.getElementById('mascot');
    if (mascot) {
        mascot.addEventListener('click', () => {
            // audioLoader.playAudio('assets/sounds/welcome.mp3');
            mascot.classList.add('bounce');
            setTimeout(() => mascot.classList.remove('bounce'), 1000);
        });
    }

    // Preload common assets
    // try {
    //     // Preload welcome screen assets
    //     await Promise.all([
    //         imageLoader.preloadImage('./assets/welcome.svg'),
    //         audioLoader.loadAudio('assets/sounds/welcome.mp3')
    //     ]);
    // } catch (error) {
    //     console.error('Error during app initialization:', error);
    // }    

    try {
        // Show welcome screen
        await sectionManager.switchSection(undefined);
        
        // Preload first section (alphabet) in the background
        // sectionManager.preloadSection('alphabet');
        
        console.log('App initialization complete');
    } catch (error) {
        console.error('Error during app initialization:', error);
    }
}

/**
 * Initialize the app when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', initApp);

