// script.js
document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-picker');
    const imageDropdown = document.getElementById('image-dropdown');
    const container = document.querySelector('.container');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const preferences = document.querySelector('.preferences');

    function adjustColorBrightness(color, percent) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
                    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
                    (B < 255 ? (B < 1 ? 0 : B) : 255))
                    .toString(16)
                    .slice(1).toUpperCase()}`;
    }

    // Add images to the dropdown
    const totalImages = 20;
    for (let i = 1; i <= totalImages; i++) {
        const option = document.createElement('option');
        option.value = `IMAGES/${i}.jpg`; // Ensure this path is correct
        option.textContent = `Image ${i}`;
        imageDropdown.appendChild(option);
    }

    // Load preferences from local storage
    const savedColor = localStorage.getItem('themeColor');
    const savedImage = localStorage.getItem('backgroundImage');
    
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        container.style.backgroundColor = adjustColorBrightness(savedColor, 20);
        header.style.backgroundColor = adjustColorBrightness(savedColor, 20);
        footer.style.backgroundColor = adjustColorBrightness(savedColor, 20);
        preferences.style.backgroundColor = adjustColorBrightness(savedColor, 30);
        colorPicker.value = savedColor;
    }

    if (savedImage) {
        document.body.style.backgroundImage = `url('${savedImage}')`;
        imageDropdown.value = savedImage;
    }

    // Event listeners for preferences
    colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.body.style.backgroundColor = color;
        container.style.backgroundColor = adjustColorBrightness(color, 20);
        header.style.backgroundColor = adjustColorBrightness(color, 20);
        footer.style.backgroundColor = adjustColorBrightness(color, 20);
        preferences.style.backgroundColor = adjustColorBrightness(color, 30);
        localStorage.setItem('themeColor', color);
        localStorage.removeItem('backgroundImage'); // Clear background image preference
    });

    imageDropdown.addEventListener('change', (e) => {
        const imageUrl = e.target.value;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        localStorage.setItem('backgroundImage', imageUrl);
        localStorage.removeItem('themeColor'); // Clear color preference
    });
});
