import { bodyPartsData } from "../common/data-content";
import { getContainer } from "../core/dom-elements";
import { speakText } from "../common/utils";
import { DOMUtils } from "../core/dom-utils";
import { ImageLoader } from "../core/image-loader";

// Track event listeners for cleanup
const eventListeners: Array<{
  element: HTMLElement;
  type: string;
  listener: EventListener;
}> = [];

/**
 * Initialize the body parts section
 */
export function initialize(): void {
  renderBodyPartsSection();
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
 * Render the body parts section
 */
function renderBodyPartsSection(): void {
  const bodyPartsContainer = getContainer("bodyParts-container");

  if (!bodyPartsContainer) {
    return;
  }

  // Clear the container efficiently
  DOMUtils.clearContainer(bodyPartsContainer);

  // Get image loader instance
  const imageLoader = ImageLoader.getInstance();

  // Use document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Create body part cards
  bodyPartsData.forEach((item) => {
    const bodyPartCard = DOMUtils.createElement("div", {
      className: "bodyPart-card",
      attributes: {
        title: `${item.name}: ${item.description}`,
        "aria-label": `${item.name}: ${item.description}`,
        tabindex: "0",
      },
    });

    // Use lazy loading for images if available
    if (item.image) {
      const bodyPartImage = imageLoader.createLazyImage(
        item.image,
        item.name,
        "bodyPart-image",
        item.color,
      );
      bodyPartCard.appendChild(bodyPartImage);
    } else {
      const bodyPartEmoji = DOMUtils.createElement("div", {
        className: "bodyPart-emoji",
        text: item.emoji,
      });
      bodyPartCard.appendChild(bodyPartEmoji);
    }

    const bodyPartName = DOMUtils.createElement("div", {
      className: "bodyPart-name",
      text: item.name,
    });
    bodyPartName.style.backgroundColor = item.color;

    const bodyPartDescription = DOMUtils.createElement("div", {
      className: "bodyPart-description",
      text: item.description,
    });

    const bodyPartFunction = DOMUtils.createElement("div", {
      className: "bodyPart-function",
      text: item.function,
    });

    bodyPartCard.appendChild(bodyPartName);
    bodyPartCard.appendChild(bodyPartDescription);
    bodyPartCard.appendChild(bodyPartFunction);

    // Add event listener and track it for cleanup
    const clickListener = () => {
      speakText(`${item.name}: ${item.description}. ${item.function}`);
      bodyPartCard.classList.add("active");
      setTimeout(() => bodyPartCard.classList.remove("active"), 1000);
    };

    bodyPartCard.addEventListener("click", clickListener);
    eventListeners.push({
      element: bodyPartCard,
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

    bodyPartCard.addEventListener("keydown", keydownListener);
    eventListeners.push({
      element: bodyPartCard,
      type: "keydown",
      listener: keydownListener,
    });

    fragment.appendChild(bodyPartCard);
  });

  bodyPartsContainer.appendChild(fragment);

  console.log("Rendered", bodyPartsData.length, "body part cards");
}
