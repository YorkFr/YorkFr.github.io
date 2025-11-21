/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initWeather();
    initCommandPalette();
    initNavigation();
});

/* --- 1. Theme Toggle --- */
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);

            // Update icon
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = next === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
            }
        });
    }
}

/* --- 2. Weather Widget --- */
function initWeather() {
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-desc');

    if (!tempEl || !descEl) return;

    // Mock data for now (API requires key)
    // In a real app, fetch from OpenWeatherMap or similar
    const weatherData = {
        temp: 22,
        condition: 'Partly Cloudy'
    };

    tempEl.textContent = `${weatherData.temp}°`;
    descEl.textContent = weatherData.condition;
}

/* --- 3. Command Palette (Simplified) --- */
function initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const trigger = document.getElementById('cmd-trigger');

    if (!palette || !input) return;

    const openPalette = () => {
        palette.style.display = 'flex';
        input.focus();
        input.value = '';
    };

    const closePalette = () => {
        palette.style.display = 'none';
    };

    if (trigger) trigger.addEventListener('click', openPalette);

    // Close on outside click
    palette.addEventListener('click', (e) => {
        if (e.target === palette) closePalette();
    });

    // Filter Logic
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.cmd-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(term) ? 'flex' : 'none';
        });
    });
}

/* --- 4. Navigation Active State --- */
function initNavigation() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-icon');

    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}

/* --- 5. Full Screen Mode --- */
window.toggleFullScreen = function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
