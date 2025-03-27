/**
 * Utilities for efficient DOM operations
 */
export class DOMUtils {
    private static documentFragment = document.createDocumentFragment();
    private static deferredOperations: Array<() => void> = [];
    private static isScheduled = false;

    /**
     * Create an element with attributes and properties
     */
    public static createElement<K extends keyof HTMLElementTagNameMap>(
        tagName: K,
        options: {
            className?: string;
            id?: string;
            attributes?: Record<string, string>;
            properties?: Record<string, any>;
            children?: (Node | string)[];
            text?: string;
            html?: string;
            events?: Record<string, EventListener>;
        } = {}
    ): HTMLElementTagNameMap[K] {
        const element = document.createElement(tagName);

        // Set className if provided
        if (options.className) {
            element.className = options.className;
        }

        // Set id if provided
        if (options.id) {
            element.id = options.id;
        }

        // Set attributes if provided
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        // Set properties if provided
        if (options.properties) {
            Object.entries(options.properties).forEach(([key, value]) => {
                (element as any)[key] = value;
            });
        }

        // Set text content if provided
        if (options.text) {
            element.textContent = options.text;
        }

        // Set inner HTML if provided
        if (options.html) {
            element.innerHTML = options.html;
        }

        // Add event listeners if provided
        if (options.events) {
            Object.entries(options.events).forEach(([eventName, listener]) => {
                element.addEventListener(eventName, listener);
            });
        }

        // Append children if provided
        if (options.children) {
            options.children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        }

        return element;
    }

    /**
     * Batch DOM operations for better performance
     * @param operation Function containing DOM operations
     */
    public static batchOperation(operation: () => void): void {
        this.deferredOperations.push(operation);

        if (!this.isScheduled) {
            this.isScheduled = true;

            // Use requestAnimationFrame for visual updates
            requestAnimationFrame(() => {
                this.flushOperations();
            });
        }
    }

    /**
     * Execute all batched operations
     */
    private static flushOperations(): void {
        const operations = [...this.deferredOperations];
        this.deferredOperations = [];
        this.isScheduled = false;

        operations.forEach(operation => {
            try {
                operation();
            } catch (error) {
                console.error('Error in batched DOM operation:', error);
            }
        });
    }

    /**
     * Create multiple elements efficiently
     * @param count Number of elements to create
     * @param createFn Function to create each element
     * @param container Container to append elements to
     */
    public static createElements<T extends HTMLElement>(
        count: number,
        createFn: (index: number) => T,
        container: HTMLElement
    ): void {
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();

        // Create elements
        for (let i = 0; i < count; i++) {
            const element = createFn(i);
            fragment.appendChild(element);
        }

        // Append all elements at once
        container.appendChild(fragment);
    }

    /**
     * Clear a container efficiently
     * @param container Container to clear
     */
    public static clearContainer(container: HTMLElement): void {
        // Faster than innerHTML = ''
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    /**
     * Remove event listeners and clear a container
     * @param container Container to clear
     * @param selector Optional selector to target specific elements
     * @param events Array of event names to remove
     */
    public static cleanupContainer(
        container: HTMLElement,
        selector: string = '*',
        events: string[] = ['click', 'mousedown', 'touchstart', 'keydown']
    ): void {
        // Remove event listeners
        const elements = container.querySelectorAll(selector);
        elements.forEach((element) => {
            events.forEach((eventName) => {
                const clone = element.cloneNode(true) as HTMLElement;
                (element as HTMLElement).replaceWith(clone);
            });
        });

        events.forEach((eventName) => {
            container.replaceWith(container.cloneNode(true));
        });

        this.clearContainer(container);
    }

    /**
     * Create a debounced function
     * @param fn Function to debounce
     * @param delay Delay in milliseconds
     */
    public static debounce<T extends (...args: any[]) => any>(
        fn: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timeoutId: number | undefined;

        return function (this: any, ...args: Parameters<T>) {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => fn.apply(this, args), delay);
        };
    }

    /**
     * Create a throttled function
     * @param fn Function to throttle
     * @param limit Limit in milliseconds
     */
    public static throttle<T extends (...args: any[]) => any>(
        fn: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let lastCall = 0;

        return function (this: any, ...args: Parameters<T>) {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                fn.apply(this, args);
            }
        };
    }
} 