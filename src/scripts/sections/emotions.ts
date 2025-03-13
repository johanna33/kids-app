import { emotionsData } from "../common/data-content";
import { emotionsContainer } from '../core/dom-elements';
import { speakText } from '../common/utils';

export function initEmotions(): void {
    emotionsContainer.innerHTML = '';
    
    emotionsData.forEach(item => {
        const emotionCard = document.createElement('div');
        emotionCard.className = 'emotion-card';
        emotionCard.style.borderTop = `5px solid ${item.color}`;
        
        const emotionIcon = document.createElement('div');
        emotionIcon.className = 'emotion-icon';
        emotionIcon.textContent = item.emoji;
        
        const emotionName = document.createElement('div');
        emotionName.className = 'emotion-name';
        emotionName.textContent = item.name;
        emotionName.style.backgroundColor = item.color;
        
        const emotionDescription = document.createElement('div');
        emotionDescription.className = 'emotion-description';
        emotionDescription.textContent = item.description;
        
        emotionCard.appendChild(emotionIcon);
        emotionCard.appendChild(emotionName);
        emotionCard.appendChild(emotionDescription);
        
        emotionCard.addEventListener('click', () => {
            // Speak the emotion name and description
            speakText(`${item.name}. ${item.description}`);
            
            // Add animation class
            emotionCard.classList.add('active');
            setTimeout(() => emotionCard.classList.remove('active'), 1000);
        });
        
        emotionsContainer.appendChild(emotionCard);
    });
} 