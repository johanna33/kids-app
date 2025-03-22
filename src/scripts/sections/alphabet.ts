import { alphabetData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";

// Track event listeners for cleanup
const eventListeners: Array<{ element: HTMLElement, type: string, listener: EventListener }> = [];

/**
 * Initialize the alphabet section
 */
export function initialize(): void {
    renderAlphabetSection();
}

/**
 * Clean up resources when section is hidden
 */
export function cleanup(): void {
    eventListeners.forEach(({ element, type, listener }) => {
        element.removeEventListener(type, listener);
    });
    eventListeners.length = 0;
}

/**
 * Render the alphabet section
 */
function renderAlphabetSection(): void {
    const alphabetContainer = getContainer('alphabet-container');
    
    if (!alphabetContainer) {
        return;
    }
    
    // Clear the container efficiently
    DOMUtils.clearContainer(alphabetContainer);
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create letter cards
    alphabetData.forEach(item => {
        const letterCard = DOMUtils.createElement('div', {
            className: 'letter-card',
            text: item.letter,
            attributes: {
                'title': `${item.letter} for ${item.word}`,
                'aria-label': `${item.letter} for ${item.word}`,
                'tabindex': '0'
            }
        });
        
        // Add event listener and track it for cleanup
        const clickListener = () => {
            speakText(`${item.letter} for ${item.word}`);
            letterCard.classList.add('active');
            setTimeout(() => letterCard.classList.remove('active'), 1000);
        };
        
        letterCard.addEventListener('click', clickListener);
        eventListeners.push({ element: letterCard, type: 'click', listener: clickListener });
        
        // Add keyboard support
        const keydownListener = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                e.preventDefault();
                clickListener();
            }
        };
        
        letterCard.addEventListener('keydown', keydownListener);
        eventListeners.push({ element: letterCard, type: 'keydown', listener: keydownListener });
        
        fragment.appendChild(letterCard);
    });
    
    alphabetContainer.appendChild(fragment);
    
    console.log('Rendered', alphabetData.length, 'letter cards');
}