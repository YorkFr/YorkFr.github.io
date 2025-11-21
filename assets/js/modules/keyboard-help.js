/* Keyboard Shortcuts Help Modal Module */

// Helper function to check if user is typing in an input field
function isTypingInInputField(event) {
    return event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA';
}

// Helper function to check if shortcut key is pressed alone (no modifiers)
function isShortcutKeyAlone(event) {
    return !event.ctrlKey && !event.metaKey && !event.altKey;
}

export function initKeyboardHelp() {
    // Create help modal
    const helpModal = document.createElement('div');
    helpModal.className = 'keyboard-help-modal';
    helpModal.setAttribute('role', 'dialog');
    helpModal.setAttribute('aria-labelledby', 'keyboard-help-title');
    helpModal.setAttribute('aria-modal', 'true');
    
    helpModal.innerHTML = `
        <div class="keyboard-help-overlay"></div>
        <div class="keyboard-help-content">
            <div class="keyboard-help-header">
                <h2 id="keyboard-help-title">
                    <i class="ph ph-keyboard"></i>
                    Keyboard Shortcuts
                </h2>
                <button class="keyboard-help-close" aria-label="Close help modal">
                    <i class="ph ph-x"></i>
                </button>
            </div>
            <div class="keyboard-help-body">
                <div class="shortcut-section">
                    <h3>Navigation</h3>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>Ctrl</kbd> + <kbd>K</kbd>
                        </div>
                        <div class="shortcut-desc">Open search palette</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>Esc</kbd>
                        </div>
                        <div class="shortcut-desc">Close search / modals</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>?</kbd>
                        </div>
                        <div class="shortcut-desc">Show this help</div>
                    </div>
                </div>
                
                <div class="shortcut-section">
                    <h3>Search</h3>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>↑</kbd> <kbd>↓</kbd>
                        </div>
                        <div class="shortcut-desc">Navigate results</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>Enter</kbd>
                        </div>
                        <div class="shortcut-desc">Open selected result</div>
                    </div>
                </div>
                
                <div class="shortcut-section">
                    <h3>Reading</h3>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>R</kbd>
                        </div>
                        <div class="shortcut-desc">Toggle reader mode</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>Home</kbd>
                        </div>
                        <div class="shortcut-desc">Scroll to top</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>End</kbd>
                        </div>
                        <div class="shortcut-desc">Scroll to bottom</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    const overlay = helpModal.querySelector('.keyboard-help-overlay');
    const closeBtn = helpModal.querySelector('.keyboard-help-close');
    
    // Open modal
    const openHelp = () => {
        helpModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Close modal
    const closeHelp = () => {
        helpModal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // Event listeners
    closeBtn.addEventListener('click', closeHelp);
    overlay.addEventListener('click', closeHelp);
    
    // Help trigger button
    const helpTrigger = document.getElementById('keyboard-help-trigger');
    if (helpTrigger) {
        helpTrigger.addEventListener('click', openHelp);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ? key - show help
        if (e.key === '?' && isShortcutKeyAlone(e)) {
            // Don't trigger if user is typing in an input
            if (isTypingInInputField(e)) return;
            e.preventDefault();
            openHelp();
        }
        
        // Escape - close help
        if (e.key === 'Escape' && helpModal.classList.contains('active')) {
            closeHelp();
        }
        
        // R key - toggle reader mode (only on post pages)
        if (e.key === 'r' && isShortcutKeyAlone(e)) {
            if (isTypingInInputField(e)) return;
            const focusToggle = document.getElementById('focus-mode-toggle');
            if (focusToggle) {
                e.preventDefault();
                focusToggle.click();
            }
        }
        
        // Home key - scroll to top
        if (e.key === 'Home' && isShortcutKeyAlone(e)) {
            if (isTypingInInputField(e)) return;
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End key - scroll to bottom
        if (e.key === 'End' && isShortcutKeyAlone(e)) {
            if (isTypingInInputField(e)) return;
            e.preventDefault();
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        }
    });
}
