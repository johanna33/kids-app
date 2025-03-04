import { shapesData } from "../data-content";
import { shapesContainer } from "../dom-elements";
import { speakText } from "../utils";

export function initShapes(): void {
    shapesContainer.innerHTML = '';
    
    shapesData.forEach(item => {
        const shapeCard = document.createElement('div');
        shapeCard.className = 'shape-card';
        
        const shapeDisplay = document.createElement('div');
        shapeDisplay.className = 'shape-display';
        shapeDisplay.innerHTML = item.svgPath;
        
        const shapeName = document.createElement('div');
        shapeName.className = 'shape-name';
        shapeName.textContent = item.name;
        
        shapeCard.appendChild(shapeDisplay);
        shapeCard.appendChild(shapeName);
        
        shapeCard.addEventListener('click', () => {
            speakText(item.name);
            shapeCard.classList.add('active');
            setTimeout(() => shapeCard.classList.remove('active'), 1000);
        });
        
        shapesContainer.appendChild(shapeCard);
    });
}