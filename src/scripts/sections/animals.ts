import { animalsData } from "../common/data-content";
import { animalsContainer, getContainer } from '../core/dom-elements';
import { playSound, speakText } from '../common/utils';



export function initAnimals(): void {
    const animalsContainer = getContainer('animals-container');
    
    if (!animalsContainer) {
        console.error('Animals container not found');
        return;
    }
    
    // Clear the container
    animalsContainer.innerHTML = '';
    
    // Create category buttons
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'categories-container';
    
    const categories = [
        { id: 'all', name: 'All Animals', emoji: '🐾' },
        { id: 'farm', name: 'Farm', emoji: '🐄' },
        { id: 'wild', name: 'Wild', emoji: '🦁' },
        { id: 'pet', name: 'Pets', emoji: '🐕' },
        { id: 'sea', name: 'Sea', emoji: '🐠' },
        { id: 'insect', name: 'Insects', emoji: '🐝' },
        { id: 'bird', name: 'Birds', emoji: '🦉' }
    ];
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-button';
        button.dataset.category = category.id;
        button.innerHTML = `${category.emoji} ${category.name}`;
        
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.category-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter animals by category
            filterAnimalsByCategory(category.id);
        });
        
        categoriesContainer.appendChild(button);
    });
    
    animalsContainer.appendChild(categoriesContainer);
    
    // Create container for animal cards
    const animalCardsContainer = document.createElement('div');
    animalCardsContainer.className = 'animal-cards-container';
    animalsContainer.appendChild(animalCardsContainer);
    
    // Set "All Animals" as default active category
    const allButton = document.querySelector('[data-category="all"]') as HTMLElement;
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Show all animals initially
    renderAnimalCards(animalsData);
    
    // Debug log
    console.log('Animals section initialized with', animalsData.length, 'animals');
}

function filterAnimalsByCategory(categoryId: string): void {
    const filteredAnimals = categoryId === 'all' 
        ? animalsData 
        : animalsData.filter(animal => animal.category === categoryId);
    
    renderAnimalCards(filteredAnimals);
    console.log('Filtered to', filteredAnimals.length, 'animals in category', categoryId);
}

function renderAnimalCards(animals: typeof animalsData): void {
    const animalCardsContainer = document.querySelector('.animal-cards-container') as HTMLElement;
    if (!animalCardsContainer) {
        console.error('Animal cards container not found');
        return;
    }
    
    animalCardsContainer.innerHTML = '';
    
    if (animals.length === 0) {
        const noAnimalsMessage = document.createElement('p');
        noAnimalsMessage.textContent = 'No animals found in this category';
        noAnimalsMessage.className = 'no-animals-message';
        animalCardsContainer.appendChild(noAnimalsMessage);
        return;
    }
    
    animals.forEach(item => {
        const animalCard = document.createElement('div');
        animalCard.className = 'animal-card';
        animalCard.style.borderTop = `5px solid ${item.color}`;
        
        // Use emoji if no image is provided
        if (item.image) {
            const animalImage = document.createElement('img');
            animalImage.className = 'animal-image';
            animalImage.src = item.image;
            animalImage.alt = item.name;
            animalCard.appendChild(animalImage);
        } else {
            const animalEmoji = document.createElement('div');
            animalEmoji.className = 'animal-emoji';
            animalEmoji.textContent = item.emoji;
            animalCard.appendChild(animalEmoji);
        }
        
        const animalName = document.createElement('div');
        animalName.className = 'animal-name';
        animalName.textContent = item.name;
        animalName.style.backgroundColor = item.color;
        
        const animalFact = document.createElement('div');
        animalFact.className = 'animal-fact';
        animalFact.textContent = item.fact;
        
        // Add sound button if sound is provided
        if (item.sound) {
            const soundButton = document.createElement('button');
            soundButton.className = 'animal-sound-button';
            soundButton.innerHTML = '🔊';
            soundButton.title = `Hear ${item.name} sound`;
            
            soundButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                playSound(item.sound as string);
            });
            
            animalCard.appendChild(soundButton);
        }
        
        animalCard.appendChild(animalName);
        animalCard.appendChild(animalFact);
        
        animalCard.addEventListener('click', () => {
            // Speak the animal name and fact
            speakText(`${item.name}. ${item.fact}`);
            
            // Add animation class
            animalCard.classList.add('active');
            setTimeout(() => animalCard.classList.remove('active'), 1000);
        });
        
        animalCardsContainer.appendChild(animalCard);
    });
    
    console.log('Rendered', animals.length, 'animal cards');
} 

/*

export function initAnimals(): void {
    console.log('Initializing animals section');
    console.log('Animals data:', animalsData);

    // Get the container when the function is called
    const animalsContainer = getContainer('animals-container');
    console.log('Animals container:', animalsContainer);
    
    if (!animalsContainer) {
        console.error('Animals container not found');
        return;
    }
    
    // Clear the container
    animalsContainer.innerHTML = '';
    
    // Add a simple test element
    const testElement = document.createElement('div');
    testElement.textContent = 'Animals section is working!';
    testElement.style.padding = '20px';
    testElement.style.backgroundColor = '#f0f0f0';
    testElement.style.borderRadius = '10px';
    testElement.style.margin = '20px';
    testElement.style.textAlign = 'center';
    
    animalsContainer.appendChild(testElement);
    
    // Add one simple animal card
    if (animalsData.length > 0) {
        const animal = animalsData[0];
        const animalCard = document.createElement('div');
        animalCard.className = 'animal-card';
        animalCard.innerHTML = `
            <div class="animal-emoji">${animal.emoji}</div>
            <div class="animal-name">${animal.name}</div>
            <div class="animal-fact">${animal.fact}</div>
        `;
        animalsContainer.appendChild(animalCard);
    }
}

*/