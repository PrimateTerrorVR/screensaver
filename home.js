class VirtualKeyboard {
    constructor() {
        this.backgrounds = [
            'https://img.freepik.com/free-vector/realistic-summer-background_52683-62823.jpg',
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D',
            'https://static.vecteezy.com/system/resources/previews/049/547/659/non_2x/stunning-high-resolution-nature-and-landscape-backgrounds-breathtaking-scenery-in-hd-free-photo.jpg'
        ];
        this.currentBackgroundIndex = 0;
        this.createFrameEmoji();
        this.keyboardContainer = this.createKeyboard();
        this.timeDisplay = this.createTimeDisplay();
        this.updateTime(); // Start the time update loop
    }

    createFrameEmoji() {
        const frameEmoji = document.createElement('div');
        frameEmoji.textContent = '📷'; // Use a camera emoji or another emoji of your choice
        frameEmoji.style.position = 'fixed';
        frameEmoji.style.top = '20px';
        frameEmoji.style.right = '20px';
        frameEmoji.style.fontSize = '36px';
        frameEmoji.style.cursor = 'pointer';
        frameEmoji.style.zIndex = '1000'; // Ensure it stays above other content
        frameEmoji.addEventListener('click', () => this.changeBackground());
        document.body.appendChild(frameEmoji);
    }

    changeBackground() {
        this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length;
        document.body.style.backgroundImage = `url(${this.backgrounds[this.currentBackgroundIndex]})`;
        document.body.style.backgroundSize = 'cover'; // Cover the entire background
        document.body.style.backgroundPosition = 'center'; // Center the background
    }

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
        container.style.zIndex = '1000';

        const keys = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
            'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter',
            'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift',
            'Space', '▲', '▼'
        ];

        keys.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.textContent = key === 'Space' ? '␣' : key;
            keyElement.style.padding = '10px';
            keyElement.style.border = '1px solid #ccc';
            keyElement.style.borderRadius = '5px';
            keyElement.style.transition = 'background-color 0.3s';
            keyElement.style.cursor = 'pointer';
            keyElement.style.textAlign = 'center';
            keyElement.style.fontSize = '16px';
            keyElement.style.fontWeight = 'bold';
            keyElement.dataset.key = key;
            container.appendChild(keyElement);
        });

        document.body.appendChild(container);
        return container;
    }

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

    updateTime() {
        const update = () => {
            const now = new Date();
            this.timeDisplay.textContent = now.toLocaleTimeString();
        };
        update(); // Initial call
        setInterval(update, 1000); // Update every second
    }
}

// Initialize the virtual keyboard
const virtualKeyboard = new VirtualKeyboard();
