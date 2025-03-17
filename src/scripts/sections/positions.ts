import { positionsData } from "../common/data-content";
import { positionsContainer } from '../core/dom-elements';
import { speakText } from '../common/utils';

export function initPositions(): void {
    positionsContainer.innerHTML = '';
    
    positionsData.forEach(item => {
        const positionCard = document.createElement('div');
        positionCard.className = 'position-card';
        positionCard.setAttribute('data-position', item.name);
        positionCard.title = item.description;
        
        const positionDisplay = document.createElement('div');
        positionDisplay.className = 'position-display';
        
        // Create the reference object (box)
        const referenceObject = document.createElement('div');
        referenceObject.className = 'position-reference';
        referenceObject.setAttribute('data-position', item.name);
        Object.assign(referenceObject.style, {
            top: item.referencePosition.top || 'auto',
            left: item.referencePosition.left || 'auto',
            right: item.referencePosition.right || 'auto',
            bottom: item.referencePosition.bottom || 'auto',
            transform: 'translate(-50%, -50%)'
        });
        
        // Create the main object (ball)
        const mainObject = document.createElement('div');
        mainObject.className = 'position-object';
        mainObject.setAttribute('data-position', item.name);
        Object.assign(mainObject.style, {
            top: item.objectPosition.top || 'auto',
            left: item.objectPosition.left || 'auto',
            right: item.objectPosition.right || 'auto',
            bottom: item.objectPosition.bottom || 'auto',
            transform: 'translate(-50%, -50%)'
        });
        
        // Create the position name
        const positionName = document.createElement('div');
        positionName.className = 'position-name';
        positionName.textContent = item.name;
        
        // Add elements to the card
        positionDisplay.appendChild(referenceObject);
        positionDisplay.appendChild(mainObject);
        positionCard.appendChild(positionDisplay);
        positionCard.appendChild(positionName);
        
        // Add click event
        positionCard.addEventListener('click', () => {
            speakText(item.description);
            positionCard.classList.add('active');
            setTimeout(() => positionCard.classList.remove('active'), 1000);
        });
        
        positionsContainer.appendChild(positionCard);
    });
}
