/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTime();
    initLanguage();
    initNavigation();
    initFocusMode();
    initCodeCopy();
    initSearch();
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

/* --- 5. Full Screen Mode (Focus Mode) --- */
function initFocusMode() {
    const toggleBtn = document.getElementById('focus-mode-toggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('focus-mode');

            // Toggle Icon/Text if needed
            const icon = toggleBtn.querySelector('i');
            if (body.classList.contains('focus-mode')) {
                icon.classList.replace('ph-arrows-out-simple', 'ph-arrows-in-simple');
            } else {
                icon.classList.replace('ph-arrows-in-simple', 'ph-arrows-out-simple');
            }
        });
    }
}

/* --- 6. Code Copy Button --- */
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Create button
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';

        // Add to block
        block.appendChild(btn);

        // Click event
        btn.addEventListener('click', () => {
            const code = block.querySelector('code');
            const text = code ? code.innerText : block.innerText;

            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = 'Copied!';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                btn.textContent = 'Error';
            });
        });
    });
}

/* --- 7. Search / Command Palette --- */
function initSearch() {
    let searchData = [];
    let selectedIndex = -1;

    // Create overlay and palette
    const overlay = document.createElement('div');
    overlay.className = 'cmd-overlay';
    overlay.innerHTML = `
        <div class="cmd-palette">
            <input type="text" class="cmd-input" placeholder="Search posts..." autocomplete="off">
            <div class="cmd-results"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.cmd-input');
    const results = overlay.querySelector('.cmd-results');

    // Load search data
    fetch('/search-data.json')
        .then(res => res.json())
        .then(data => {
            searchData = data;
        })
        .catch(err => console.error('Failed to load search data:', err));

    // Open palette
    const openSearch = () => {
        overlay.classList.add('active');
        input.value = '';
        input.focus();
        selectedIndex = -1;
        renderResults([]);
    };

    // Close palette
    const closeSearch = () => {
        overlay.classList.remove('active');
    };

    // Search function
    const search = (query) => {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        return searchData.filter(post => {
            return post.title.toLowerCase().includes(lowerQuery) ||
                post.excerpt.toLowerCase().includes(lowerQuery) ||
                post.categories.some(cat => cat.toLowerCase().includes(lowerQuery));
        });
    };

    // Render results
    const renderResults = (items) => {
        if (items.length === 0) {
            results.innerHTML = '<div class="cmd-empty">No results found</div>';
            return;
        }

        results.innerHTML = items.map((item, index) => `
            <div class="cmd-result-item ${index === selectedIndex ? 'selected' : ''}" data-index="${index}">
                <div class="cmd-result-title">${item.title}</div>
                <div class="cmd-result-meta">${item.date} · ${item.categories.join(', ')}</div>
            </div>
        `).join('');

        // Add click handlers
        results.querySelectorAll('.cmd-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                window.location.href = items[index].url;
            });
        });
    };

    // Event listeners
    document.getElementById('cmd-trigger')?.addEventListener('click', openSearch);

    // Keyboard shortcut: Ctrl/Cmd + K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }

        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeSearch();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const currentResults = search(input.value);
            selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
            renderResults(currentResults);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const currentResults = search(input.value);
            selectedIndex = Math.max(selectedIndex - 1, 0);
            renderResults(currentResults);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            const currentResults = search(input.value);
            if (currentResults[selectedIndex]) {
                window.location.href = currentResults[selectedIndex].url;
            }
        }
    });

    input.addEventListener('input', (e) => {
        const query = e.target.value;
        const items = search(query);
        selectedIndex = items.length > 0 ? 0 : -1;
        renderResults(items);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeSearch();
        }
    });
}

/* --- 8. Native Full Screen (Optional Helper) --- */
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
