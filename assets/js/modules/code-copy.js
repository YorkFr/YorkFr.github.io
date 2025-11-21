/* Code Copy Button Module */

export function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Skip if button already exists
        if (block.querySelector('.copy-btn')) return;

        // Create button
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');

        // Add to block
        block.appendChild(btn);

        // Click event
        btn.addEventListener('click', () => {
            const code = block.querySelector('code');
            const text = code ? code.innerText : block.innerText;

            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                btn.setAttribute('aria-label', 'Code copied to clipboard');

                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                    btn.setAttribute('aria-label', 'Copy code to clipboard');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                btn.textContent = 'Error';
                btn.setAttribute('aria-label', 'Failed to copy code');
            });
        });
    });
}
