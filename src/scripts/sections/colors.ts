import { colorsData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";

// Track event listeners for cleanup
const eventListeners: Array<{ element: HTMLElement, type: string, listener: EventListener }> = [];

/**
 * Initialize the colors section
 */
export function initialize(): void {
    renderColorsSection();
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
 * Render the colors section
 */
function renderColorsSection(): void {
    const colorsContainer = getContainer('colors-container');
    
    if (!colorsContainer) {
        return;
    }
    
    // Clear the container efficiently
    DOMUtils.clearContainer(colorsContainer);
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create color cards
    colorsData.forEach(item => {
        const colorCard = DOMUtils.createElement('div', {
            className: 'color-card',
            attributes: {
                'title': item.name,
                'aria-label': item.name,
                'tabindex': '0'
            }
        });
        colorCard.style.backgroundColor = item.hex;
        
        const colorName = DOMUtils.createElement('div', {
            className: 'color-name',
            text: item.name
        });
        
        colorCard.appendChild(colorName);
        
        // Add event listener and track it for cleanup
        const clickListener = () => {
            speakText(item.name);
            colorCard.classList.add('active');
            setTimeout(() => colorCard.classList.remove('active'), 1000);
        };
        
        colorCard.addEventListener('click', clickListener);
        eventListeners.push({ element: colorCard, type: 'click', listener: clickListener });
        
        // Add keyboard support
        const keydownListener = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                e.preventDefault();
                clickListener();
            }
        };
        
        colorCard.addEventListener('keydown', keydownListener);
        eventListeners.push({ element: colorCard, type: 'keydown', listener: keydownListener });
        
        fragment.appendChild(colorCard);
    });
    
    colorsContainer.appendChild(fragment);
    
    console.log('Rendered', colorsData.length, 'color cards');
}

