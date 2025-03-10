import { alphabetData } from "../data-content";
import { alphabetContainer } from "../dom-elements";
import { speakText } from "../utils";

export function initAlphabet(): void {
    alphabetContainer.innerHTML = '';

    alphabetData.forEach(item => {
        const letterCard = document.createElement('div');
        letterCard.className = 'letter-card';
        letterCard.textContent = item.letter;
        letterCard.title = `${item.letter} for ${item.word}`;

        letterCard.addEventListener('click', () => {
            speakText(`${item.letter} for ${item.word}`);
            letterCard.classList.add('active');
            setTimeout(() => letterCard.classList.remove('active'), 1000);
        });

        alphabetContainer.appendChild(letterCard);
    });
}