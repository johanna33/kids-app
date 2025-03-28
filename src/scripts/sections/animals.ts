import { animalsData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { AudioLoader } from "../core/audio-loader";
import { ImageLoader } from "../core/image-loader";
import { DOMUtils } from "../core/dom-utils";
import { speakText } from "../common/utils";

// Track event listeners for cleanup
const eventListeners: Array<{
  element: HTMLElement;
  type: string;
  listener: EventListener;
}> = [];

/**
 * Initialize the animals section
 */
export function initialize(): void {
  renderAnimalsSection();
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
 * Render the animals section
 */
function renderAnimalsSection(): void {
  const animalsContainer = getContainer("animals-container");

  if (!animalsContainer) {
    return;
  }

  // Clear the container efficiently
  DOMUtils.clearContainer(animalsContainer);

  // Create category buttons
  const categoriesContainer = DOMUtils.createElement("div", {
    className: "categories-container",
  });

  const categories = [
    { id: "all", name: "All Animals", emoji: "🐾" },
    { id: "farm", name: "Farm", emoji: "🐄" },
    { id: "wild", name: "Wild", emoji: "🦁" },
    { id: "pet", name: "Pets", emoji: "🐕" },
    { id: "sea", name: "Sea", emoji: "🐠" },
    { id: "insect", name: "Insects", emoji: "🐝" },
    { id: "bird", name: "Birds", emoji: "🦉" },
  ];

  // Use batch operation for better performance
  DOMUtils.batchOperation(() => {
    categories.forEach((category) => {
      const button = DOMUtils.createElement("button", {
        className: "category-button",
        attributes: {
          "data-category": category.id,
          "aria-label": `Show ${category.name} animals`,
        },
        html: `${category.emoji} ${category.name}`,
      });

      // Add event listener and track it for cleanup
      const clickListener = () => {
        // Remove active class from all buttons
        document.querySelectorAll(".category-button").forEach((btn) => {
          btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Filter animals by category
        filterAnimalsByCategory(category.id);
      };

      button.addEventListener("click", clickListener);
      eventListeners.push({
        element: button,
        type: "click",
        listener: clickListener,
      });

      categoriesContainer.appendChild(button);
    });
  });

  animalsContainer.appendChild(categoriesContainer);

  // Create container for animal cards
  const animalCardsContainer = DOMUtils.createElement("div", {
    className: "animal-cards-container",
  });
  animalsContainer.appendChild(animalCardsContainer);

  // Set "All Animals" as default active category
  const allButton = document.querySelector(
    '[data-category="all"]',
  ) as HTMLElement;
  if (allButton) {
    allButton.classList.add("active");
  }

  // Show all animals initially
  renderAnimalCards(animalsData);
}

/**
 * Filter animals by category
 */
function filterAnimalsByCategory(categoryId: string): void {
  const filteredAnimals =
    categoryId === "all"
      ? animalsData
      : animalsData.filter((animal) => animal.category === categoryId);

  renderAnimalCards(filteredAnimals);
  console.log(
    "Filtered to",
    filteredAnimals.length,
    "animals in category",
    categoryId,
  );
}

/**
 * Render animal cards with performance optimizations
 */
function renderAnimalCards(animals: typeof animalsData): void {
  const animalCardsContainer = document.querySelector(
    ".animal-cards-container",
  ) as HTMLElement;
  if (!animalCardsContainer) {
    console.error("Animal cards container not found");
    return;
  }

  // Clear container efficiently
  DOMUtils.clearContainer(animalCardsContainer);

  if (animals.length === 0) {
    const noAnimalsMessage = DOMUtils.createElement("p", {
      className: "no-animals-message",
      text: "No animals found in this category",
    });
    animalCardsContainer.appendChild(noAnimalsMessage);
    return;
  }

  // Get service instances
  const imageLoader = ImageLoader.getInstance();
  const audioLoader = AudioLoader.getInstance();

  // Use document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Create animal cards
  animals.forEach((item) => {
    const animalCard = DOMUtils.createElement("div", {
      className: "animal-card",
      attributes: {
        "aria-label": item.name,
        tabindex: "0",
      },
    });
    animalCard.style.borderTop = `5px solid ${item.color}`;

    // Use lazy loading for images
    if (item.image) {
      const animalImage = imageLoader.createLazyImage(
        item.image,
        item.name,
        "animal-image",
        item.color,
      );
      animalCard.appendChild(animalImage);
    } else {
      const animalEmoji = DOMUtils.createElement("div", {
        className: "animal-emoji",
        text: item.emoji,
      });
      animalCard.appendChild(animalEmoji);
    }

    const animalName = DOMUtils.createElement("div", {
      className: "animal-name",
      text: item.name,
    });
    animalName.style.backgroundColor = item.color;

    const animalFact = DOMUtils.createElement("div", {
      className: "animal-fact",
      text: item.fact,
    });

    // Add sound button if sound is provided
    if (item.sound) {
      // Preload the sound file
      audioLoader.loadAudio(item.sound);

      const soundButton = DOMUtils.createElement("button", {
        className: "animal-sound-button",
        html: "🔊",
        attributes: {
          title: `Hear ${item.name} sound`,
          "aria-label": `Play ${item.name} sound`,
        },
      });

      // Add event listener and track it for cleanup
      const soundClickListener = (e: Event) => {
        e.stopPropagation(); // Prevent card click
        audioLoader.playAudio(item.sound as string);
      };

      soundButton.addEventListener("click", soundClickListener);
      eventListeners.push({
        element: soundButton,
        type: "click",
        listener: soundClickListener,
      });

      animalCard.appendChild(soundButton);
    }

    animalCard.appendChild(animalName);
    animalCard.appendChild(animalFact);

    // Add event listener and track it for cleanup
    const cardClickListener = () => {
      // Speak the animal name and fact
      speakText(`${item.name}. ${item.fact}`);

      // Add animation class
      animalCard.classList.add("active");
      setTimeout(() => animalCard.classList.remove("active"), 1000);
    };

    animalCard.addEventListener("click", cardClickListener);
    eventListeners.push({
      element: animalCard,
      type: "click",
      listener: cardClickListener,
    });

    // Add keyboard support
    const cardKeydownListener = (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === "Enter" || keyEvent.key === " ") {
        e.preventDefault();
        cardClickListener();
      }
    };

    animalCard.addEventListener("keydown", cardKeydownListener);
    eventListeners.push({
      element: animalCard,
      type: "keydown",
      listener: cardKeydownListener,
    });

    fragment.appendChild(animalCard);
  });

  animalCardsContainer.appendChild(fragment);

  console.log("Rendered", animals.length, "animal cards");
}
