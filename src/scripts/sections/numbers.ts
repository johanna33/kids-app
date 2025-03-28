import { numbersData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText, showCountingAnimation } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";

// Track event listeners for cleanup
const eventListeners: Array<{
  element: HTMLElement;
  type: string;
  listener: EventListener;
}> = [];

/**
 * Initialize the numbers section
 */
export function initialize(): void {
  renderNumbersSection();
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
 * Render the numbers section
 */
function renderNumbersSection(): void {
  const numbersContainer = getContainer("numbers-container");

  if (!numbersContainer) {
    return;
  }

  // Clear the container efficiently
  DOMUtils.clearContainer(numbersContainer);

  // Use document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Create number cards
  numbersData.forEach((item) => {
    const numberCard = DOMUtils.createElement("div", {
      className: "number-card",
      text: item.number.toString(),
      attributes: {
        title: `${item.number} - ${item.word}`,
        "aria-label": `${item.number} - ${item.word}`,
        tabindex: "0",
      },
    });

    // Add event listener and track it for cleanup
    const clickListener = () => {
      speakText(`${item.number}`);
      numberCard.classList.add("active");
      setTimeout(() => numberCard.classList.remove("active"), 1000);

      // Show counting animation
      showCountingAnimation(item.number);
    };

    numberCard.addEventListener("click", clickListener);
    eventListeners.push({
      element: numberCard,
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

    numberCard.addEventListener("keydown", keydownListener);
    eventListeners.push({
      element: numberCard,
      type: "keydown",
      listener: keydownListener,
    });

    fragment.appendChild(numberCard);
  });

  numbersContainer.appendChild(fragment);

  console.log("Rendered", numbersData.length, "number cards");
}
