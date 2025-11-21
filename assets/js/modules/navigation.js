/* Navigation Active State Module */

export function initNavigation() {
    let path = window.location.pathname;
    // Normalize common Jekyll outputs
    if (path.endsWith('/index.html')) path = path.replace('/index.html', '/');

    const allNavLinks = document.querySelectorAll('.nav-logo, .nav-icon');

    allNavLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');

        // Add active class to matching link
        const href = link.getAttribute('href');
        if (
            href === path ||
            (path === '/' && href === '/') ||
            (href && path.startsWith(href)) ||
            (href && path === `${href}.html`)
        ) {
            link.classList.add('active');
        }
    });
}
