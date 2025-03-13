import { contentSections, homeButton, navButtons, welcomeScreen } from "./dom-elements";
import { initAlphabet } from "./sections/alphabet";
import { initColors } from "./sections/colors";
import { initEmotions } from "./sections/emotions";
import { initNumbers } from "./sections/numbers";
import { initPositions } from "./sections/positions";
import { initShapes } from "./sections/shapes";
import { playSound } from "./utils";
import { initBodyParts } from "./sections/bodyParts";
import { initAnimals } from "./sections/animals";

/** Initialize the app */
function initApp(): void {
    // Add event listener to home button
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            showSection(undefined);
        });
    }

    // Add event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = (button as HTMLElement).dataset.section;
            showSection(section);
        });
    });

    // Initialize content sections
    initAlphabet();
    initNumbers();
    initColors();
    initShapes();
    initPositions();
    initEmotions();
    initBodyParts();
    initAnimals();

    // Add mascot interaction - the owl
    const mascot = document.getElementById('mascot');
    if (mascot) {
        mascot.addEventListener('click', () => {
            playSound('assets/sounds/welcome.mp3'); //TODO: add the sound file in the path described.
            mascot.classList.add('bounce');
            setTimeout(() => mascot.classList.remove('bounce'), 1000);
        });
    }
}

/** Show the selected section by buttons */
function showSection(sectionName: string | undefined): void {
    // Hide all sections first
    welcomeScreen.classList.remove('active');
    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    if (sectionName) {
        const selectedSection = document.getElementById(`${sectionName}-section`);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
    } else {
        // If no section name is provided, show the welcome screen
        welcomeScreen.classList.add('active');
        // Play a welcome sound or animation
        playSound('assets/sounds/welcome.mp3'); //TODO: add the sound file in the path described.
    }
}

/** Initialize the app when the DOM is loaded */
document.addEventListener('DOMContentLoaded', initApp);

