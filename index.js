/**
 * Class representing a virtual keyboard.
 */
class VirtualKeyboard {
    /**
     * Creates an instance of VirtualKeyboard.
     */
    constructor() {
        this.backgrounds = [
            'https://img.freepik.com/free-vector/realistic-summer-background_52683-62823.jpg',
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D',
            'https://static.vecteezy.com/system/resources/previews/049/547/659/non_2x/stunning-high-resolution-nature-and-landscape-backgrounds-breathtaking-scenery-in-hd-free-photo.jpg'
        ];
        this.currentBackgroundIndex = 0;
        this.keyboardContainer = this.createKeyboard();
        this.timeDisplay = this.createTimeDisplay();
        this.createFrameEmoji(); // Create the frame emoji on initialization
        this.updateTime(); // Start the time update loop
    }

    // Create the frame emoji in the top right corner
    createFrameEmoji() {
        const frameEmoji = document.createElement('div');
        frameEmoji.textContent = '📷'; // Frame emoji (camera)
        frameEmoji.style.position = 'fixed';
        frameEmoji.style.top = '20px';
        frameEmoji.style.right = '20px';
        frameEmoji.style.fontSize = '36px';
        frameEmoji.style.cursor = 'pointer';
        frameEmoji.style.zIndex = '1000'; // Ensure it stays above other content
        frameEmoji.addEventListener('click', () => this.changeBackground());
        document.body.appendChild(frameEmoji);
    }

    // Change the background when the frame emoji is clicked
    changeBackground() {
        this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length;
        document.body.style.backgroundImage = `url(${this.backgrounds[this.currentBackgroundIndex]})`;
        document.body.style.backgroundSize = 'cover'; // Cover the entire background
        document.body.style.backgroundPosition = 'center'; // Center the background
    }

    /**
     * Creates the keyboard layout and appends it to the body.
     *
     * @returns {HTMLElement} The keyboard container element.
     */
    createKeyboard() {
        const container = document.createElement('div');
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(14, 1fr)';
        container.style.gap = '5px';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.padding = '10px';
        container.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        container.style.borderRadius = '10px';
        container.style.maxWidth = '90%';
        container.style.zIndex = '1000'; // Make sure it stays above other content

        // Include letters, numbers, and special characters
        const keys = [
            '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
            'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter',
            'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift',
            'Space', '▲', '▼'
        ];

        keys.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.textContent = key === 'Space' ? '␣' : key; // Use a space symbol
            keyElement.style.padding = '10px';
            keyElement.style.border = '1px solid #ccc';
            keyElement.style.borderRadius = '5px';
            keyElement.style.transition = 'background-color 0.3s';
            keyElement.style.cursor = 'pointer';
            keyElement.style.textAlign = 'center';
            keyElement.style.fontSize = '16px';
            keyElement.style.fontWeight = 'bold';
            keyElement.dataset.key = key; // Store the key value in a data attribute
            container.appendChild(keyElement);
        });

        document.body.appendChild(container);
        return container;
    }

    /**
     * Creates a digital clock display.
     *
     * @returns {HTMLElement} The clock display element.
     */
    createTimeDisplay() {
        const clock = document.createElement('div');
        clock.style.position = 'fixed';
        clock.style.top = '20px';
        clock.style.left = '50%';
        clock.style.transform = 'translateX(-50%)';
        clock.style.fontSize = '24px';
        clock.style.color = '#333';
        clock.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        clock.style.padding = '10px';
        clock.style.borderRadius = '5px';
        clock.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        document.body.appendChild(clock);
        return clock;
    }

    /**
     * Updates the time display every second.
     */
    updateTime() {
        const update = () => {
            const now = new Date();
            this.timeDisplay.textContent = now.toLocaleTimeString();
        };
        update(); // Initial call
        setInterval(update, 1000); // Update every second
    }

    /**
     * Initializes event listeners for key press.
     */
    initEventListeners() {
        document.addEventListener('keydown', (event) => this.handleKeyPress(event.key));
        document.addEventListener('keyup', (event) => this.handleKeyRelease(event.key));
    }

    /**
     * Handles the key press event.
     *
     * @param {string} key - The key that was pressed.
     */
    handleKeyPress(key) {
        const keyElement = this.keyboardContainer.querySelector(`div[data-key="${key.toUpperCase()}"]`);
        if (keyElement) {
            keyElement.style.backgroundColor = 'lightblue'; // Change color on press
        }
    }

    /**
     * Handles the key release event.
     *
     * @param {string} key - The key that was released.
     */
    handleKeyRelease(key) {
        const keyElement = this.keyboardContainer.querySelector(`div[data-key="${key.toUpperCase()}"]`);
        if (keyElement) {
            keyElement.style.backgroundColor = ''; // Reset to normal
        }
    }
}

// Initialize the virtual keyboard
const virtualKeyboard = new VirtualKeyboard();
