/* Category Filter Module */

export function initCategoryFilter() {
    const categoryTags = document.querySelectorAll('.category-tag');
    const postCards = document.querySelectorAll('.stream-card[data-categories]');
    let activeCategory = null;

    if (!categoryTags.length || !postCards.length) return;

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

                // Filter posts - cards can contain multiple comma-separated categories
                postCards.forEach(card => {
                    const categories = card.dataset.categories.split(',').map(c => c.trim());
                    card.style.display = categories.includes(category) ? '' : 'none';
                });
            }
        });
    });
}
