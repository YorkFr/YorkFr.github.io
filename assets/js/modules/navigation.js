/* Navigation Active State Module */

export function initNavigation() {
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
