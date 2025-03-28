import { emotionsData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";

// Track event listeners for cleanup
const eventListeners: Array<{
  element: HTMLElement;
  type: string;
  listener: EventListener;
}> = [];

/**
 * Initialize the emotions section
 */
export function initialize(): void {
  renderEmotionsSection();
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
 * Render the emotions section
 */
function renderEmotionsSection(): void {
  const emotionsContainer = getContainer("emotions-container");

  if (!emotionsContainer) {
    return;
  }

  // Clear the container efficiently
  DOMUtils.clearContainer(emotionsContainer);

  // Use document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Create emotion cards
  emotionsData.forEach((item) => {
    const emotionCard = DOMUtils.createElement("div", {
      className: "emotion-card",
      attributes: {
        title: `${item.name}: ${item.description}`,
        "aria-label": `${item.name}: ${item.description}`,
        tabindex: "0",
      },
    });

    const emotionIcon = DOMUtils.createElement("div", {
      className: "emotion-icon",
      text: item.emoji,
    });

    const emotionName = DOMUtils.createElement("div", {
      className: "emotion-name",
      text: item.name,
    });
    emotionName.style.backgroundColor = item.color;

    const emotionDescription = DOMUtils.createElement("div", {
      className: "emotion-description",
      text: item.description,
    });

    emotionCard.appendChild(emotionIcon);
    emotionCard.appendChild(emotionName);
    emotionCard.appendChild(emotionDescription);

    // Add event listener and track it for cleanup
    const clickListener = () => {
      speakText(`${item.name}: ${item.description}`);
      emotionCard.classList.add("active");
      setTimeout(() => emotionCard.classList.remove("active"), 1000);
    };

    emotionCard.addEventListener("click", clickListener);
    eventListeners.push({
      element: emotionCard,
      type: "click",
      listener: clickListener,
    });

    // Add keyboard support
    const keydownListener = (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === "Enter" || keyEvent.key === " ") {
        e.preventDefault();
        clickListener();
      }
    };

    emotionCard.addEventListener("keydown", keydownListener);
    eventListeners.push({
      element: emotionCard,
      type: "keydown",
      listener: keydownListener,
    });

    fragment.appendChild(emotionCard);
  });

  emotionsContainer.appendChild(fragment);

  console.log("Rendered", emotionsData.length, "emotion cards");
}
