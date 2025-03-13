
export function speakText(text: string): void {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.4; // Slightly slower for kids
        utterance.pitch = 1.2; // Slightly higher pitch for kids
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Text-to-speech not supported in this browser');
    }
}

export function playSound(soundPath: string): void {
    const audio = new Audio(soundPath);
    audio.play().catch(error => {
        console.log('Error playing sound:', error);
    });
}

export function showCountingAnimation(count: number): void {
    // Create or get the counting animation container
    let animContainer = document.getElementById('counting-animation');
    if (!animContainer) {
        animContainer = document.createElement('div');
        animContainer.id = 'counting-animation';
        animContainer.className = 'counting-animation';
        document.body.appendChild(animContainer);
    }

    // Clear previous dots
    animContainer.innerHTML = '';
    animContainer.style.display = 'flex';

    // Create and animate dots one by one
    let currentDot = 0;
    const interval = setInterval(() => {
        if (currentDot < count) {
            const dot = document.createElement('div');
            dot.className = 'counting-dot';
            dot.textContent = (currentDot + 1).toString();
            
            // Add animation class
            dot.style.animation = 'popIn 0.5s ease-out';
            
            // Speak the number
            speakText((currentDot + 1).toString());
            
            animContainer.appendChild(dot);
            currentDot++;
        } else {
            clearInterval(interval);
            // Hide the container after a delay
            setTimeout(() => {
                if (animContainer) {
                    animContainer.style.display = 'none';
                }
            }, 2000);
        }
    }, 1000); // Show a new dot every second
}