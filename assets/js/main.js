/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTime();
    initLanguage();
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
        });
    }
}

/* --- 2. Time Widget --- */
function initTime() {
    const timeDisplay = document.getElementById('local-time');
    const dateDisplay = document.getElementById('local-date');

    if (!timeDisplay) return;

    const updateTime = () => {
        const now = new Date();

        // Time: HH:MM:SS
        timeDisplay.textContent = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Date: Mon, Nov 21
        if (dateDisplay) {
            dateDisplay.textContent = now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    updateTime();
    setInterval(updateTime, 1000);
}

/* --- 3. Language Toggle --- */
function initLanguage() {
    const langBtn = document.getElementById('lang-toggle');
    const html = document.documentElement;
    const langLabel = langBtn ? langBtn.querySelector('span') : null;

    // Default to English
    if (!html.getAttribute('data-lang')) {
        html.setAttribute('data-lang', 'en');
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-lang');
            const next = current === 'en' ? 'zh' : 'en';
            html.setAttribute('data-lang', next);

            if (langLabel) {
                langLabel.textContent = next.toUpperCase();
            }
        });
    }
}

/* --- 4. Navigation Active State --- */
function initNavigation() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-icon');

    links.forEach(link => {
        // Simple match, can be improved for sub-paths
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
