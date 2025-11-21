/* Category Filter Module */

export function initCategoryFilter() {
    const categoryTags = document.querySelectorAll('.category-tag');
    const postCards = document.querySelectorAll('.stream-card[data-categories]');
    let activeCategory = null;

    if (!categoryTags.length || !postCards.length) return;

    const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';

    const applyCategory = (category) => {
        activeCategory = category;

        // Update active states
        categoryTags.forEach(t => {
            if (category && t.dataset.category === category) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Show/hide posts
        postCards.forEach(card => {
            if (!category) {
                card.style.display = '';
                return;
            }
            const categories = card.dataset.categories.split(',').map(c => c.trim());
            card.style.display = categories.includes(category) ? '' : 'none';
        });
    };

    // Pre-select from query param on home
    const preset = new URLSearchParams(window.location.search).get('category');
    if (isHome && preset) {
        applyCategory(preset);
    }

    categoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const category = tag.dataset.category;

            // If not on home, navigate with query to trigger filter there
            if (!isHome) {
                window.location.href = `/?category=${encodeURIComponent(category)}`;
                return;
            }

            // Toggle selection on home without leaving page
            if (activeCategory === category) {
                applyCategory(null);
            } else {
                applyCategory(category);
                // Update URL without reload
                const url = new URL(window.location.href);
                url.searchParams.set('category', category);
                window.history.replaceState({}, '', url.toString());
            }
        });
    });
}
