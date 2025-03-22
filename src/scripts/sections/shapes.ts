import { shapesData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";

// Track event listeners for cleanup
const eventListeners: Array<{ element: HTMLElement, type: string, listener: EventListener }> = [];

/**
 * Initialize the shapes section
 */
export function initialize(): void {
    renderShapesSection();
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
 * Render the shapes section
 */
function renderShapesSection(): void {
    const shapesContainer = getContainer('shapes-container');
    
    if (!shapesContainer) {
        return;
    }
    
    // Clear the container efficiently
    DOMUtils.clearContainer(shapesContainer);
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create shape cards
    shapesData.forEach(item => {
        const shapeCard = DOMUtils.createElement('div', {
            className: 'shape-card',
            attributes: {
                'title': item.name,
                'aria-label': item.name,
                'tabindex': '0'
            }
        });
        
        const shapeDisplay = DOMUtils.createElement('div', {
            className: 'shape-display',
            html: item.svgPath
        });
        
        const shapeName = DOMUtils.createElement('div', {
            className: 'shape-name',
            text: item.name
        });
        
        shapeCard.appendChild(shapeDisplay);
        shapeCard.appendChild(shapeName);
        
        // Add event listener and track it for cleanup
        const clickListener = () => {
            speakText(item.name);
            shapeCard.classList.add('active');
            setTimeout(() => shapeCard.classList.remove('active'), 1000);
        };
        
        shapeCard.addEventListener('click', clickListener);
        eventListeners.push({ element: shapeCard, type: 'click', listener: clickListener });
        
        // Add keyboard support
        const keydownListener = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                e.preventDefault();
                clickListener();
            }
        };
        
        shapeCard.addEventListener('keydown', keydownListener);
        eventListeners.push({ element: shapeCard, type: 'keydown', listener: keydownListener });
        
        fragment.appendChild(shapeCard);
    });
    
    shapesContainer.appendChild(fragment);
    
    console.log('Rendered', shapesData.length, 'shape cards');
}