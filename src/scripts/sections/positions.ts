import { positionsData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";

// Track event listeners for cleanup
const eventListeners: Array<{ element: HTMLElement, type: string, listener: EventListener }> = [];

/**
 * Initialize the positions section
 */
export function initialize(): void {
    renderPositionsSection();
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
 * Render the positions section
 */
function renderPositionsSection(): void {
    const positionsContainer = getContainer('positions-container');
    
    if (!positionsContainer) {
        return;
    }
    
    // Clear the container efficiently
    DOMUtils.clearContainer(positionsContainer);
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create position cards
    positionsData.forEach(item => {
        const positionCard = DOMUtils.createElement('div', {
            className: 'position-card',
            attributes: {
                'title': item.name,
                'aria-label': `${item.name}: ${item.description}`,
                'tabindex': '0'
            }
        });
        
        const positionDisplay = DOMUtils.createElement('div', {
            className: 'position-display'
        });
        
        // Create reference object (like a box)
        const referenceObject = DOMUtils.createElement('div', {
            className: 'position-reference'
        });
        
        // Apply reference position styles
        if (item.referencePosition) {
            Object.entries(item.referencePosition).forEach(([key, value]) => {
                (referenceObject.style as any)[key] = value as string;
            });
        }
        
        // Create position object (like a ball)
        const positionObject = DOMUtils.createElement('div', {
            className: 'position-object'
        });
        
        // Apply object position styles
        if (item.objectPosition) {
            Object.entries(item.objectPosition).forEach(([key, value]) => {
                (positionObject.style as any)[key] = value as string;
            });
        }
        
        // Add objects to display
        positionDisplay.appendChild(referenceObject);
        positionDisplay.appendChild(positionObject);
        
        const positionName = DOMUtils.createElement('div', {
            className: 'position-name',
            text: item.name
        });
        
        positionCard.appendChild(positionDisplay);
        positionCard.appendChild(positionName);
        
        // Add event listener and track it for cleanup
        const clickListener = () => {
            speakText(`${item.name}: ${item.description}`);
            positionCard.classList.add('active');
            setTimeout(() => positionCard.classList.remove('active'), 1000);
        };
        
        positionCard.addEventListener('click', clickListener);
        eventListeners.push({ element: positionCard, type: 'click', listener: clickListener });
        
        // Add keyboard support
        const keydownListener = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                e.preventDefault();
                clickListener();
            }
        };
        
        positionCard.addEventListener('keydown', keydownListener);
        eventListeners.push({ element: positionCard, type: 'keydown', listener: keydownListener });
        
        fragment.appendChild(positionCard);
    });
    
    positionsContainer.appendChild(fragment);
    
    console.log('Rendered', positionsData.length, 'position cards');
}

