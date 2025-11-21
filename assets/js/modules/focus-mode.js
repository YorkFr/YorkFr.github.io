/* Enhanced Focus Mode with Reader Controls Module */

export function initFocusMode() {
    const toggleBtn = document.getElementById('focus-mode-toggle');
    const toggleLabel = toggleBtn ? toggleBtn.querySelector('.focus-label') : null;
    const exitBtn = document.getElementById('exit-focus');
    const scrollTopBtn = document.getElementById('scroll-to-top');
    const body = document.body;
    const postContent = document.querySelector('.post-content-clean');
    const articleShell = document.querySelector('.post-detail-clean');
    const fontSlider = document.getElementById('font-slider');
    const fontSizeLabel = document.getElementById('font-size-label');
    const widthButtons = document.querySelectorAll('.width-btn');
    const scrollContainer = document.querySelector('.main-stream');

    // Font size state
    const fontSizes = ['font-small', 'font-medium', 'font-large', 'font-xlarge'];
    const fontLabels = ['Compact', 'Comfort', 'Large', 'Focus'];
    let fontSizeLevel = 1; // default medium

    // Line width state
    const lineWidths = ['width-narrow', 'width-medium', 'width-wide'];
    let lineWidth = 'medium';

    // Toggle focus mode
    const toggleFocusMode = () => {
        body.classList.toggle('focus-mode');

        // Update icon
        const icon = toggleBtn?.querySelector('i');
        if (icon) {
            if (body.classList.contains('focus-mode')) {
                icon.className = 'ph ph-book-open-text';
                if (toggleLabel) toggleLabel.textContent = 'Reader on';
            } else {
                icon.className = 'ph ph-book-open';
                if (toggleLabel) toggleLabel.textContent = 'Reader';
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
            if (toggleLabel) toggleLabel.textContent = 'Reader';
        });
    }

    // Scroll to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            const target = scrollContainer || window;
            target.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Show/hide based on scroll position
        const watchScroll = () => {
            const position = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
            if (position > 300 && body.classList.contains('focus-mode')) {
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0.5';
            }
        };

        (scrollContainer || window).addEventListener('scroll', watchScroll);
    }

    // Font slider
    const applyFontLevel = (level) => {
        if (!postContent) return;
        postContent.classList.remove(...fontSizes);
        postContent.classList.add(fontSizes[level]);
        fontSizeLevel = level;
        if (fontSizeLabel) {
            fontSizeLabel.textContent = fontLabels[level] || 'Comfort';
        }
    };

    if (fontSlider) {
        fontSlider.addEventListener('input', (e) => {
            const level = parseInt(e.target.value, 10);
            applyFontLevel(Math.max(0, Math.min(level, fontSizes.length - 1)));
        });
    }

    // Width buttons
    widthButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetWidth = btn.dataset.width;
            if (!targetWidth || !articleShell) return;

            articleShell.classList.remove(...lineWidths);
            articleShell.classList.add(`width-${targetWidth}`);
            lineWidth = targetWidth;

            widthButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Initialize default classes
    if (postContent) {
        postContent.classList.add('font-medium');
    }
    if (articleShell) {
        articleShell.classList.add('width-medium');
    }

    applyFontLevel(fontSizeLevel);
    widthButtons.forEach(btn => {
        if (btn.dataset.width === lineWidth) {
            btn.classList.add('active');
        }
    });
}
