import { colorsData } from "../data-content";
import { colorsContainer } from "../dom-elements";
import { speakText } from "../utils";

export function initColors(): void {
    colorsContainer.innerHTML = '';
    
    colorsData.forEach(item => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = item.hex;
        
        const colorName = document.createElement('div');
        colorName.className = 'color-name';
        colorName.textContent = item.name;
        
        colorCard.appendChild(colorName);
        
        colorCard.addEventListener('click', () => {
            speakText(item.name);
            colorCard.classList.add('active');
            setTimeout(() => colorCard.classList.remove('active'), 1000);
        });
        
        colorsContainer.appendChild(colorCard);
    });
}
