/* Table of Contents Generator Module */

// Configuration constants
const TOC_CONFIG = {
    MIN_HEADINGS: 3,
    MAX_ID_LENGTH: 50,
    OBSERVER_ROOT_MARGIN: '-80px 0px -80% 0px',
    OBSERVER_THRESHOLD: 0
};

export function initTableOfContents() {
    // Only run on post pages
    const postContent = document.querySelector('.post-content-clean');
    if (!postContent) return;

    // Find all headings (h2, h3)
    const headings = postContent.querySelectorAll('h2, h3');
    
    // Don't create TOC if there are fewer than required headings
    if (headings.length < TOC_CONFIG.MIN_HEADINGS) return;

    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents';
    tocContainer.innerHTML = `
        <div class="toc-header">
            <i class="ph ph-list-bullets"></i>
            <span>Table of Contents</span>
            <button class="toc-toggle" aria-label="Toggle table of contents">
                <i class="ph ph-caret-down"></i>
            </button>
        </div>
        <nav class="toc-nav" aria-label="Table of contents"></nav>
    `;

    const tocNav = tocContainer.querySelector('.toc-nav');
    const tocToggle = tocContainer.querySelector('.toc-toggle');
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    // Generate IDs for headings and build TOC
    headings.forEach((heading, index) => {
        // Generate ID if it doesn't exist
        if (!heading.id) {
            const id = heading.textContent
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, TOC_CONFIG.MAX_ID_LENGTH);
            heading.id = `${id}-${index}`;
        }

        // Create TOC item
        const listItem = document.createElement('li');
        listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';
        
        // Smooth scroll to heading
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update URL without triggering scroll
            history.pushState(null, '', `#${heading.id}`);
            
            // Highlight heading briefly
            heading.classList.add('toc-highlight');
            setTimeout(() => heading.classList.remove('toc-highlight'), 2000);
        });

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocNav.appendChild(tocList);

    // Insert TOC after post header, before content
    const postHeader = document.querySelector('.post-header-clean');
    if (postHeader && postHeader.nextSibling) {
        postHeader.parentNode.insertBefore(tocContainer, postHeader.nextSibling);
    } else {
        postContent.insertBefore(tocContainer, postContent.firstChild);
    }

    // Toggle functionality
    let isCollapsed = false;
    tocToggle.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        tocContainer.classList.toggle('collapsed', isCollapsed);
        const icon = tocToggle.querySelector('i');
        icon.className = isCollapsed ? 'ph ph-caret-right' : 'ph ph-caret-down';
    });

    // Highlight current section on scroll
    const observerOptions = {
        rootMargin: TOC_CONFIG.OBSERVER_ROOT_MARGIN,
        threshold: TOC_CONFIG.OBSERVER_THRESHOLD
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                tocList.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const id = entry.target.id;
                const activeLink = tocList.querySelector(`a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all headings
    headings.forEach(heading => observer.observe(heading));
}
