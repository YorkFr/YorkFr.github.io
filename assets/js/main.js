/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTime();
    initLanguage();
    initNavigation();
    initFocusMode();
    initCodeCopy();
    initSearch();
    initCategoryFilter();
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
    const allNavLinks = document.querySelectorAll('.nav-logo, .nav-icon');

    allNavLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');

        // Add active class to matching link
        const href = link.getAttribute('href');
        if (href === path || (path === '/' && href === '/')) {
            link.classList.add('active');
        }
    });
}




/* --- 5. Enhanced Focus Mode with Reader Controls --- */
function initFocusMode() {
    const toggleBtn = document.getElementById('focus-mode-toggle');
    const exitBtn = document.getElementById('exit-focus');
    const scrollTopBtn = document.getElementById('scroll-to-top');
    const body = document.body;
    const postContent = document.querySelector('.post-content-clean');
    const controlBtns = document.querySelectorAll('.control-btn');

    // Font size state
    let fontSizeLevel = 1; // 0: small, 1: medium (default), 2: large, 3: xlarge
    const fontSizes = ['font-small', 'font-medium', 'font-large', 'font-xlarge'];

    // Line width state
    let lineWidth = 'medium'; // narrow, medium (default), wide
    const lineWidths = ['width-narrow', 'width-medium', 'width-wide'];

    // Toggle focus mode
    const toggleFocusMode = () => {
        body.classList.toggle('focus-mode');

        // Update icon
        const icon = toggleBtn?.querySelector('i');
        if (icon) {
            if (body.classList.contains('focus-mode')) {
                icon.className = 'ph ph-book-open-text';
            } else {
                icon.className = 'ph ph-book-open';
            }
        }
    };

    // Focus mode toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleFocusMode);
    }

    // Exit focus mode
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            body.classList.remove('focus-mode');
            const icon = toggleBtn?.querySelector('i');
            if (icon) icon.className = 'ph ph-book-open';
        });
    }

    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300 && body.classList.contains('focus-mode')) {
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0.5';
            }
        });
    }

    // Reader controls
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;

            if (!postContent) return;

            // Font size controls
            if (action === 'font-decrease' && fontSizeLevel > 0) {
                postContent.classList.remove(fontSizes[fontSizeLevel]);
                fontSizeLevel--;
                postContent.classList.add(fontSizes[fontSizeLevel]);
                updateActiveButton('font', fontSizeLevel);
            } else if (action === 'font-reset') {
                postContent.classList.remove(...fontSizes);
                fontSizeLevel = 1;
                postContent.classList.add('font-medium');
                updateActiveButton('font', 1);
            } else if (action === 'font-increase' && fontSizeLevel < 3) {
                postContent.classList.remove(fontSizes[fontSizeLevel]);
                fontSizeLevel++;
                postContent.classList.add(fontSizes[fontSizeLevel]);
                updateActiveButton('font', fontSizeLevel);
            }

            // Line width controls
            else if (action.startsWith('width-')) {
                const newWidth = action.replace('width-', '');
                postContent.classList.remove(...lineWidths);
                postContent.classList.add(`width-${newWidth}`);
                lineWidth = newWidth;

                // Update active state
                document.querySelectorAll('[data-action^="width-"]').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            }
        });
    });

    // Helper function to update active button state
    function updateActiveButton(type, level) {
        if (type === 'font') {
            const actions = ['font-decrease', 'font-reset', 'font-increase'];
            document.querySelectorAll('[data-action^="font-"]').forEach(b => {
                b.classList.remove('active');
            });
            // Highlight the current level button
            if (level === 1) {
                document.querySelector('[data-action="font-reset"]')?.classList.add('active');
            }
        }
    }

    // Initialize default classes
    if (postContent) {
        postContent.classList.add('font-medium', 'width-medium');
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
                <div class="cmd-result-meta">${item.date} | ${item.categories.join(', ')}</div>
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


/* --- 8. Category Filter --- */
function initCategoryFilter() {
    const categoryTags = document.querySelectorAll('.category-tag');
    const postCards = document.querySelectorAll('.stream-card[data-categories]');
    let activeCategory = null;

    categoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tag.dataset.category;

            // Toggle category selection
            if (activeCategory === category) {
                // Deselect - show all posts
                activeCategory = null;
                categoryTags.forEach(t => t.classList.remove('active'));
                postCards.forEach(card => {
                    card.style.display = '';
                });
            } else {
                // Select new category
                activeCategory = category;

                // Update active state
                categoryTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                // Filter posts - check if category is in the comma-separated list
                postCards.forEach(card => {
                    const categories = card.dataset.categories.split(',');
                    if (categories.includes(category)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}

/* --- 9. Native Full Screen (Optional Helper) --- */
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
