import { speakText, showCountingAnimation } from "../scripts/common/utils";

describe("Utils Module", () => {
  describe("speakText", () => {
    beforeEach(() => {
      // Mock the speechSynthesis API
      Object.defineProperty(window, "speechSynthesis", {
        value: {
          speak: jest.fn(),
        },
        writable: true,
      });

      // Mock the SpeechSynthesisUtterance constructor
      global.SpeechSynthesisUtterance = jest
        .fn()
        .mockImplementation((text: string) => ({
          text,
          rate: 0.4,
          pitch: 1.2,
        }));
    });

    it("should call speechSynthesis.speak with the correct utterance", () => {
      const text = "Hello, world!";
      speakText(text);

      expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
      const utterance = (window.speechSynthesis.speak as jest.Mock).mock
        .calls[0][0];
      expect(utterance.text).toBe(text);
      expect(utterance.rate).toBe(0.4);
      expect(utterance.pitch).toBe(1.2);
    });

    it("should log a message if speechSynthesis is not supported", () => {
      Object.defineProperty(window, "speechSynthesis", {
        value: undefined,
        writable: true,
      });
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      speakText("Hello, world!");
      expect(consoleSpy).toHaveBeenCalledWith(
        "Text-to-speech not supported in this browser",
      );

      consoleSpy.mockRestore();
    });
  });

  describe("showCountingAnimation", () => {
    beforeEach(() => {
      // Clear the DOM before each test
      document.body.innerHTML = "";
    });

    it("should create and display the counting animation container", () => {
      showCountingAnimation(3);

      const animContainer = document.getElementById("counting-animation");
      expect(animContainer).not.toBeNull();
      expect(animContainer?.style.display).toBe("flex");
    });

    it.skip("should create the correct number of dots and speak their numbers", () => {
      jest.useFakeTimers(); // Use fake timers to control the interval
      const speakTextSpy = jest.spyOn(
        require("../scripts/common/utils"),
        "speakText",
      );

      showCountingAnimation(3);

      jest.advanceTimersByTime(6000); // Simulate 6 seconds passing

      const animContainer = document.getElementById("counting-animation");
      expect(animContainer?.children.length).toBe(3);
      expect(speakTextSpy).toHaveBeenCalledTimes(3);
      expect(speakTextSpy).toHaveBeenNthCalledWith(1, "1");
      expect(speakTextSpy).toHaveBeenNthCalledWith(2, "2");
      expect(speakTextSpy).toHaveBeenNthCalledWith(3, "3");

      jest.useRealTimers(); // Restore real timers
    });

    it("should hide the animation container after the animation is complete", () => {
      jest.useFakeTimers();

      showCountingAnimation(3);

      jest.advanceTimersByTime(6000); // Simulate 5 seconds passing (3 dots + 2 seconds delay)

      const animContainer = document.getElementById("counting-animation");
      expect(animContainer?.style.display).toBe("none");

      jest.useRealTimers();
    });
  });
});
