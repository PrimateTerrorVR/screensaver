/**
 * Class representing a virtual keyboard.
 */
class VirtualKeyboard {
    constructor() {
        this.keyboardContainer = this.createKeyboard();
        this.timeDisplay = this.createTimeDisplay();
        this.isYellowGlow = false;
        this.isRandomColorGlow = false;
        this.snowflakesEnabled = false; // Track snowflakes state
        this.currentTheme = 'light'; // Default theme
        this.snowflakes = []; // Initialize snowflakes array
        this.customSoundUp = null; // Placeholder for the custom sound
        this.initEventListeners();
        this.updateTime(); // Start time update loop
        this.createSettingsMenu(); // Create settings menu
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
        container.style.backgroundColor = this.currentTheme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(50, 50, 50, 0.9)';
        container.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        container.style.borderRadius = '10px';
        container.style.maxWidth = '90%';
        container.style.zIndex = '1000'; // Keep it above other content

        const keys = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
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

    initEventListeners() {
        document.addEventListener('keydown', (event) => this.handleKeyPress(event.key));
        document.addEventListener('keyup', (event) => this.handleKeyRelease(event.key));
    }

    handleKeyPress(key) {
        const keyElement = this.keyboardContainer.querySelector(`div[data-key="${key.toUpperCase()}"]`);
        if (keyElement) {
            keyElement.style.backgroundColor = this.getGlowColor();
            // Play sound if it is the 'O' key
            if (key === 'o' && this.customSoundUp) {
                this.playSound(this.customSoundUp);
            }
        }
    }

    handleKeyRelease(key) {
        const keyElement = this.keyboardContainer.querySelector(`div[data-key="${key.toUpperCase()}"]`);
        if (keyElement) {
            keyElement.style.backgroundColor = ''; // Reset to normal
        }
    }

    createSettingsMenu() {
        const settingsContainer = document.createElement('div');
        settingsContainer.style.position = 'fixed';
        settingsContainer.style.top = '80px';
        settingsContainer.style.left = '50%';
        settingsContainer.style.transform = 'translateX(-50%)';
        settingsContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        settingsContainer.style.padding = '15px';
        settingsContainer.style.borderRadius = '5px';
        settingsContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        settingsContainer.style.zIndex = '1000'; // Keep it above other content

        const toggleContainer = document.createElement('div');
        toggleContainer.style.display = 'flex';
        toggleContainer.style.flexDirection = 'column';
        toggleContainer.style.alignItems = 'center';

        const yellowToggle = this.createToggleButton('Yellow Glow', () => {
            this.isYellowGlow = !this.isYellowGlow;
        });

        const randomColorToggle = this.createToggleButton('Random Color Glow', () => {
            this.isRandomColorGlow = !this.isRandomColorGlow;
        });

        const snowflakeToggle = this.createToggleButton('Toggle Snowflakes', () => {
            this.snowflakesEnabled = !this.snowflakesEnabled;
            if (this.snowflakesEnabled) {
                this.startSnowflakes();
            } else {
                this.stopSnowflakes();
            }
        });

        const uploadSoundButton = document.createElement('input');
        uploadSoundButton.type = 'file';
        uploadSoundButton.accept = 'audio/*'; // Accept audio files only
        uploadSoundButton.style.margin = '5px';
        uploadSoundButton.style.padding = '10px';
        uploadSoundButton.style.cursor = 'pointer';
        uploadSoundButton.style.borderRadius = '5px';
        uploadSoundButton.style.border = '1px solid #ccc';
        uploadSoundButton.style.backgroundColor = '#f0f0f0';
        uploadSoundButton.style.fontWeight = 'bold';
        uploadSoundButton.addEventListener('change', (event) => this.handleSoundUpload(event));

        toggleContainer.appendChild(yellowToggle);
        toggleContainer.appendChild(randomColorToggle);
        toggleContainer.appendChild(snowflakeToggle);
        toggleContainer.appendChild(uploadSoundButton); // Add upload button
        settingsContainer.appendChild(toggleContainer);
        document.body.appendChild(settingsContainer);
    }

    createToggleButton(label, onClick) {
        const button = document.createElement('button');
        button.textContent = label;
        button.style.margin = '5px';
        button.style.padding = '10px';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.style.border = '1px solid #ccc';
        button.style.backgroundColor = '#f0f0f0';
        button.style.fontWeight = 'bold';
        button.onclick = onClick;
        return button;
    }

    startSnowflakes() {
        this.createSnowflake(); // Create the first snowflake
        this.snowflakeInterval = setInterval(() => {
            this.createSnowflake(); // Create new snowflakes at intervals
        }, 300); // Adjust this value for more or fewer snowflakes
    }

    stopSnowflakes() {
        clearInterval(this.snowflakeInterval);
        this.snowflakes.forEach(snowflake => {
            document.body.removeChild(snowflake);
        });
        this.snowflakes = [];
    }

    createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.textContent = '❄️';
        snowflake.style.position = 'fixed';
        snowflake.style.fontSize = '24px';
        snowflake.style.pointerEvents = 'none'; // Make snowflakes non-interactive
        snowflake.style.opacity = Math.random(); // Random opacity
        snowflake.style.left = Math.random() * window.innerWidth + 'px'; // Random horizontal position
        snowflake.style.top = '0px';
        
        document.body.appendChild(snowflake);
        this.snowflakes.push(snowflake);

        const fallDuration = Math.random() * 3 + 2; // Random duration for falling
        snowflake.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(${window.innerHeight}px)` }
        ], {
            duration: fallDuration * 1000,
            easing: 'linear',
            fill: 'forwards'
        }).onfinish = () => {
            document.body.removeChild(snowflake); // Remove snowflake after falling
            this.snowflakes.splice(this.snowflakes.indexOf(snowflake), 1); // Remove from array
        };
    }

    handleSoundUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.customSoundUp = new Audio(e.target.result); // Create audio object from uploaded sound
            };
            reader.readAsDataURL(file);
        }
    }

    playSound(sound) {
        if (sound) {
            sound.currentTime = 0; // Reset playback position
            sound.play().catch(error => {
                console.error("Error playing sound:", error);
            });
        }
    }

    getGlowColor() {
        if (this.isYellowGlow) return 'yellow';
        if (this.isRandomColorGlow) return `hsl(${Math.random() * 360}, 100%, 50%)`;
        return 'initial'; // Default to no glow
    }
}

// Instantiate the virtual keyboard
const virtualKeyboard = new VirtualKeyboard();
