import { getContainer } from '../scripts/core/dom-elements';

describe('DOM Elements Module', () => {
    beforeEach(() => {
        // Set up a mock DOM structure
        document.body.innerHTML = `
            <div class="alphabet-container"></div>
            <div class="numbers-container"></div>
            <div class="colors-container"></div>
            <div class="shapes-container"></div>
            <div class="positions-container"></div>
            <div class="emotions-container"></div>
            <div class="bodyParts-container"></div>
            <div class="animals-container"></div>
        `;
    });

    describe('getContainer', () => {
        it('should return the correct container element when it exists', () => {
            const container = getContainer('numbers-container');
            expect(container).toBeInstanceOf(HTMLElement);
            expect(container.className).toBe('numbers-container');
        });

        it('should log an error and return undefined when the container does not exist', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            const container = getContainer('nonexistent-container');
            expect(container).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith('Container .nonexistent-container not found');
            consoleSpy.mockRestore();
        });
    });
});