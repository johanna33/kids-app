import { SectionManager } from "../scripts/core/section-manager";
import { contentSections, welcomeScreen } from "../scripts/core/dom-elements";

jest.mock("../scripts/core/dom-elements", () => ({
  contentSections: Array.from({ length: 3 }, (_, i) => {
    const section = document.createElement("div");
    section.id = `section-${i}`;
    return section;
  }),
  welcomeScreen: document.createElement("div"),
}));

describe("SectionManager", () => {
  let sectionManager: SectionManager;

  beforeEach(() => {
    // Reset DOM and SectionManager instance
    document.body.innerHTML = "";
    contentSections.forEach((section) => document.body.appendChild(section));
    document.body.appendChild(welcomeScreen);

    sectionManager = SectionManager.getInstance();
  });

  describe("switchSection", () => {
    it("should switch to the welcome screen if no section is specified", async () => {
      await sectionManager.switchSection(undefined);
      expect(welcomeScreen.classList.contains("active")).toBe(true);
      contentSections.forEach((section) => {
        expect(section.classList.contains("active")).toBe(false);
      });
    });

    it.skip("should switch to the specified section if it exists", async () => {
      const sectionName = "section-1";
      const sectionElement = document.getElementById(sectionName);
      sectionElement?.classList.add("active"); // Mock active state

      jest
        .spyOn(sectionManager as any, "loadAndInitializeSection")
        .mockResolvedValue({
          initialize: jest.fn(),
        });

      await sectionManager.switchSection(sectionName);
      expect(sectionElement?.classList.contains("active")).toBe(true);
      expect(welcomeScreen.classList.contains("active")).toBe(false);
    });

    it("should log an error and show the welcome screen if the section does not exist", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      await sectionManager.switchSection("nonexistent-section");
      expect(consoleSpy).toHaveBeenCalledWith(
        "Section element #nonexistent-section-section not found",
      );
      expect(welcomeScreen.classList.contains("active")).toBe(true);
      consoleSpy.mockRestore();
    });
  });

  describe("loadAndInitializeSection", () => {
    it.skip("should load and initialize a section if not already loaded", async () => {
      const mockModule = { initialize: jest.fn(), cleanup: jest.fn() };
      jest
        .spyOn(sectionManager as any, "importAndInitializeSection")
        .mockResolvedValue(mockModule);

      const sectionName = "section-1";
      const result = await (sectionManager as any).loadAndInitializeSection(
        sectionName,
      );

      expect(result).toBe(mockModule);
      expect(mockModule.initialize).toHaveBeenCalled();
    });

    it.skip("should return the cached module if the section is already loaded", async () => {
      const mockModule = { initialize: jest.fn(), cleanup: jest.fn() };
      (sectionManager as any).loadedSections.set("section-1", mockModule);

      const result = await (sectionManager as any).loadAndInitializeSection(
        "section-1",
      );
      expect(result).toBe(mockModule);
      expect(mockModule.initialize).not.toHaveBeenCalled(); // No re-initialization
    });
  });

  describe("preloadSection", () => {
    it.skip("should preload a section without displaying it", async () => {
      const mockModule = { initialize: jest.fn(), cleanup: jest.fn() };
      jest
        .spyOn(sectionManager as any, "loadAndInitializeSection")
        .mockResolvedValue(mockModule);

      await sectionManager.preloadSection("section-1");
      expect(mockModule.initialize).toHaveBeenCalled();
    });
  });
});
