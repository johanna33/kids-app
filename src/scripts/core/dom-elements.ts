/** DOM Elements */
export const navButtons = document.querySelectorAll('.nav-button');
export const homeButton = document.querySelector('.home-button') as HTMLElement;
export const contentSections = document.querySelectorAll('.section-content');
export const welcomeScreen = document.querySelector('.welcome-screen') as HTMLElement;

//Cards
export const alphabetContainer = document.querySelector('.alphabet-container') as HTMLElement;
export const numbersContainer = document.querySelector('.numbers-container') as HTMLElement;
export const colorsContainer = document.querySelector('.colors-container') as HTMLElement;
export const shapesContainer = document.querySelector('.shapes-container') as HTMLElement;
export const positionsContainer = document.querySelector('.positions-container') as HTMLElement;
export const emotionsContainer = document.querySelector('.emotions-container') as HTMLElement;
export const bodyPartsContainer = document.querySelector('.bodyParts-container') as HTMLElement;
export const animalsContainer = document.querySelector('.animals-container') as HTMLElement;

// Get container elements when needed
export function getContainer(containerClass: string): HTMLElement {
    const container = document.querySelector(`.${containerClass}`) as HTMLElement;
    if (!container) {
        console.error(`Container .${containerClass} not found`);
    }
    return container;
}