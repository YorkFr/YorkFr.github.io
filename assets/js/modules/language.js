/* Language Toggle Module */

export function initLanguage() {
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
