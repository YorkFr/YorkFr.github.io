/* Category Filter Module */

export function initCategoryFilter() {
    const categoryTags = document.querySelectorAll('.category-tag');
    const postCards = document.querySelectorAll('.stream-card[data-category]');
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

                // Filter posts
                postCards.forEach(card => {
                    if (card.dataset.category === category) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}
