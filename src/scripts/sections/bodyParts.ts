import { bodyPartsData } from "../common/data-content";
import { speakText } from '../common/utils';

export function initBodyParts(): void {
    console.log("Initializing body parts section");
    
    // Find the container directly when the function is called
    const bodyPartsSection = document.getElementById('bodyParts-section');
    
    if (!bodyPartsSection) {
        console.error('Body parts section not found in the DOM');
        return;
    }
    
    // Find or create the body parts container
    let bodyPartsContainer = bodyPartsSection.querySelector('.bodyParts-container');
    
    if (!bodyPartsContainer) {
        console.log('Creating new body parts container');
        bodyPartsContainer = document.createElement('div');
        bodyPartsContainer.className = 'bodyParts-container';
        
        // Find the h2 element
        const heading = bodyPartsSection.querySelector('h2');
        
        if (heading) {
            // Insert after the heading
            heading.insertAdjacentElement('afterend', bodyPartsContainer);
        } else {
            // Or just append to the section
            bodyPartsSection.appendChild(bodyPartsContainer);
        }
    }
    
    // Clear the container
    bodyPartsContainer.innerHTML = '';
    
    // Render body part cards
    bodyPartsData.forEach(item => {
        const bodyPartCard = document.createElement('div');
        bodyPartCard.className = 'bodyPart-card';
        bodyPartCard.style.borderTop = `5px solid ${item.color}`;
        
        const bodyPartEmoji = document.createElement('div');
        bodyPartEmoji.className = 'bodyPart-emoji';
        bodyPartEmoji.textContent = item.emoji;
        
        const bodyPartName = document.createElement('div');
        bodyPartName.className = 'bodyPart-name';
        bodyPartName.textContent = item.name;
        bodyPartName.style.backgroundColor = item.color;
        
        const bodyPartDescription = document.createElement('div');
        bodyPartDescription.className = 'bodyPart-description';
        bodyPartDescription.textContent = item.description;
        
        const bodyPartFunction = document.createElement('div');
        bodyPartFunction.className = 'bodyPart-function';
        bodyPartFunction.textContent = item.function;
        
        bodyPartCard.appendChild(bodyPartEmoji);
        bodyPartCard.appendChild(bodyPartName);
        bodyPartCard.appendChild(bodyPartDescription);
        bodyPartCard.appendChild(bodyPartFunction);
        
        bodyPartCard.addEventListener('click', () => {
            // Speak the body part information
            speakText(`${item.name}. ${item.description}. ${item.function}`);
            
            // Add animation class
            bodyPartCard.classList.add('active');
            setTimeout(() => bodyPartCard.classList.remove('active'), 1000);
        });
        
        bodyPartsContainer.appendChild(bodyPartCard);
    });
    
    console.log('Body parts section initialized with', bodyPartsData.length, 'parts');
} 