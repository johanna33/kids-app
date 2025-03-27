import { DOMUtils } from '../scripts/core/dom-utils';

describe('DOMUtils Suite', () => {
    describe('createElement', () => {
        it('should create an element with the specified tag name', () => {
            const element = DOMUtils.createElement('div');
            expect(element.tagName).toBe('DIV');
        });

        it('should set the className if provided', () => {
            const element = DOMUtils.createElement('div', { className: 'test-class' });
            expect(element.className).toBe('test-class');
        });

        it('should set the id if provided', () => {
            const element = DOMUtils.createElement('div', { id: 'test-id' });
            expect(element.id).toBe('test-id');
        });

        it('should set attributes if provided', () => {
            const element = DOMUtils.createElement('div', { attributes: { 'data-test': 'value' } });
            expect(element.getAttribute('data-test')).toBe('value');
        });

        it('should set properties if provided', () => {
            const element = DOMUtils.createElement('input', { properties: { value: 'test' } });
            expect((element as HTMLInputElement).value).toBe('test');
        });

        it('should set text content if provided', () => {
            const element = DOMUtils.createElement('div', { text: 'test text' });
            expect(element.textContent).toBe('test text');
        });

        it('should set inner HTML if provided', () => {
            const element = DOMUtils.createElement('div', { html: '<span>test</span>' });
            expect(element.innerHTML).toBe('<span>test</span>');
        });

        it('should add event listeners if provided', () => {
            const clickHandler = jest.fn();
            const element = DOMUtils.createElement('button', { events: { click: clickHandler } });
            element.click();
            expect(clickHandler).toHaveBeenCalled();
        });

        it('should append children if provided', () => {
            const child = document.createElement('span');
            const element = DOMUtils.createElement('div', { children: [child] });
            expect(element.firstChild).toBe(child);
        });
    });

    describe('batchOperation', () => {
        it('should batch DOM operations', (done) => {
            const operation = jest.fn();
            DOMUtils.batchOperation(operation);
            requestAnimationFrame(() => {
                expect(operation).toHaveBeenCalled();
                done();
            });
            jest.runAllTimers(); 
        });
    });

    describe('createElements', () => {
        it('should create multiple elements efficiently', () => {
            const container = document.createElement('div');
            DOMUtils.createElements(3, (index) => {
                const element = document.createElement('span');
                element.textContent = `Item ${index}`;
                return element;
            }, container);
            expect(container.children.length).toBe(3);
            expect(container.children[0].textContent).toBe('Item 0');
        });
    });

    describe('clearContainer', () => {
        it('should clear a container efficiently', () => {
            const container = document.createElement('div');
            container.appendChild(document.createElement('span'));
            DOMUtils.clearContainer(container);
            expect(container.children.length).toBe(0);
        });
    });

    describe('cleanupContainer', () => {
        it.skip('should remove event listeners and clear a container', () => {
            const container = document.createElement('div');
            const child = document.createElement('span');
            const clickHandler = jest.fn();
            child.addEventListener('click', clickHandler);
            container.appendChild(child);
            DOMUtils.cleanupContainer(container);
            child.click();
            expect(clickHandler).not.toHaveBeenCalled();
            expect(container.children.length).toBe(0);
        });
    });

    describe('debounce', () => {
        jest.useFakeTimers();

        it('should debounce a function', () => {
            const fn = jest.fn();
            const debouncedFn = DOMUtils.debounce(fn, 100);
            debouncedFn();
            debouncedFn();
            jest.advanceTimersByTime(50);
            debouncedFn();
            jest.advanceTimersByTime(50);
            expect(fn).not.toHaveBeenCalled();
            jest.advanceTimersByTime(50);
            expect(fn).toHaveBeenCalledTimes(1);
        });
    });

    describe('throttle', () => {
        jest.useFakeTimers();

        it('should throttle a function', () => {
            const fn = jest.fn();
            const throttledFn = DOMUtils.throttle(fn, 100);
            throttledFn();
            throttledFn();
            jest.advanceTimersByTime(50);
            throttledFn();
            jest.advanceTimersByTime(50);
            expect(fn).toHaveBeenCalledTimes(1);
            jest.advanceTimersByTime(50);
            throttledFn();
            expect(fn).toHaveBeenCalledTimes(2);
        });
    });
});