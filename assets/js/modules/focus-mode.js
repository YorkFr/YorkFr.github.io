/* Enhanced Focus Mode with Reader Controls Module */

export function initFocusMode() {
    const toggleBtn = document.getElementById('focus-mode-toggle');
    const toggleLabel = toggleBtn ? toggleBtn.querySelector('.focus-label') : null;
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

    // Mark default width button as active
    document.querySelector('[data-action="width-medium"]')?.classList.add('active');
}
