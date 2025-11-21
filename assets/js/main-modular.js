/* Main Entry Point - Module Imports */

import { initTheme } from './modules/theme.js';
import { initTime } from './modules/time.js';
import { initLanguage } from './modules/language.js';
import { initNavigation } from './modules/navigation.js';
import { initCodeCopy } from './modules/code-copy.js';
import { initSearch } from './modules/search.js';
import { initCategoryFilter } from './modules/category-filter.js';
import { initFocusMode } from './modules/focus-mode.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTime();
    initLanguage();
    initNavigation();
    initCodeCopy();
    initSearch();
    initCategoryFilter();
    initFocusMode();
});

// Optional: Native Full Screen Helper
window.toggleFullScreen = function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
