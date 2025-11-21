/* Search / Command Palette Module */

export function initSearch() {
    let searchData = [];
    let selectedIndex = -1;
    let isLoading = true;

    // Create overlay and palette
    const overlay = document.createElement('div');
    overlay.className = 'cmd-overlay';
    overlay.innerHTML = `
        <div class="cmd-palette" role="dialog" aria-label="Search posts">
            <input type="text" class="cmd-input" placeholder="Search posts..." autocomplete="off" aria-label="Search input">
            <div class="cmd-results" role="listbox" aria-label="Search results"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.cmd-input');
    const results = overlay.querySelector('.cmd-results');

    // Load search data
    fetch('/search-data.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            searchData = data;
            isLoading = false;
        })
        .catch(err => {
            console.error('Failed to load search data:', err);
            isLoading = false;
            results.innerHTML = '<div class="cmd-empty">Search unavailable</div>';
        });

    // Open palette
    const openSearch = () => {
        if (isLoading) {
            results.innerHTML = '<div class="cmd-empty">Loading...</div>';
        }
        overlay.classList.add('active');
        input.value = '';
        input.focus();
        selectedIndex = -1;
        if (!isLoading) {
            renderResults([]);
        }
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
            <div class="cmd-result-item ${index === selectedIndex ? 'selected' : ''}" 
                 data-index="${index}" 
                 role="option" 
                 aria-selected="${index === selectedIndex}">
                <div class="cmd-result-title">${escapeHtml(item.title)}</div>
                <div class="cmd-result-meta">${escapeHtml(item.date)} | ${item.categories.map(escapeHtml).join(', ')}</div>
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

    // Helper function to escape HTML
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
