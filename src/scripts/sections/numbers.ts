import { numbersData } from "../data-content";
import { numbersContainer } from "../dom-elements";
import { showCountingAnimation, speakText } from "../utils";

export function initNumbers(): void {
    numbersContainer.innerHTML = '';
    
    numbersData.forEach(item => {
        const numberCard = document.createElement('div');
        numberCard.className = 'number-card';
        numberCard.textContent = item.number.toString();
        numberCard.title = `${item.word} - ${item.number}`;
        
        numberCard.addEventListener('click', () => {
            speakText(`${item.number}`);
            
            // Create dots for counting
            showCountingAnimation(item.number);
            
            numberCard.classList.add('active');
            setTimeout(() => numberCard.classList.remove('active'), 1000);
        });
        
        numbersContainer.appendChild(numberCard);
    });
}