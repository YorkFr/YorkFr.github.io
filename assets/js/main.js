/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initCommandPalette();
    initNavigation();
});

/* --- 1. Clock Widget --- */
function initClock() {
    const clockEl = document.getElementById('clock-widget');
    if (!clockEl) return;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 1000); // Update every second
}

/* --- 2. Command Palette Logic --- */
function initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('cmd-input');
    const trigger = document.getElementById('cmd-palette-trigger');

    if (!palette || !input) return;

    // Open/Close functions
    const openPalette = () => {
        palette.style.display = 'flex';
        input.focus();
        input.value = ''; // Clear input
    };

    const closePalette = () => {
        palette.style.display = 'none';
    };

    // Trigger click
    if (trigger) {
        trigger.addEventListener('click', openPalette);
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Cmd+K or Ctrl+K to open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openPalette();
        }
        // ESC to close
        if (e.key === 'Escape' && palette.style.display === 'flex') {
            closePalette();
        }
    });

    // Click outside to close
    palette.addEventListener('click', (e) => {
        if (e.target === palette) {
            closePalette();
        }
    });

    // Simple Filter Logic (Mock)
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.cmd-item');

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(term)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

/* --- 3. Navigation Active State --- */
function initNavigation() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-icon');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* --- 4. Theme Toggle (Optional) --- */
window.toggleTheme = function () {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);

    // Close palette after action
    document.getElementById('cmd-palette').style.display = 'none';
}

/* --- 5. Focus Mode --- */
window.toggleFocusMode = function () {
    document.body.classList.toggle('focus-mode');
    const btn = document.getElementById('focus-toggle-btn');
    if (btn) {
        const isFocus = document.body.classList.contains('focus-mode');
        btn.innerHTML = isFocus
            ? '<i class="ph ph-corners-in"></i> Exit Focus Mode'
            : '<i class="ph ph-corners-out"></i> Enter Focus Mode';
    }
}
