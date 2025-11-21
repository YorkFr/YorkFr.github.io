/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initFocusMode();
    initScrollEffects();
});

/* --- Language Switcher --- */
const translations = {
    'en': {
        'nav-overview': 'Overview',
        'nav-archive': 'Archive',
        'nav-about': 'About',
        'nav-github': 'GitHub',
        'hero-greeting': "Hi, I'm YorkFr.",
        'hero-desc': 'Exploring the intersection of <span style="color: var(--primary-color); font-weight: 500;">Technology</span>, <span style="color: var(--accent-red); font-weight: 500;">Design</span>, and <span style="color: var(--accent-green); font-weight: 500;">Growth</span>.',
        'latest-articles': 'Latest Articles',
        'view-archive': 'View Archive →',
        'read-article': 'Read Article',
        'back-home': '← Back to Home',
        'archive-title': 'Archive',
        'about-title': 'About YorkFr',
        'about-greeting': "Hi, I'm YorkFr.",
        'about-tagline': 'Developer / Designer / Lifelong Learner',
        'about-intro': 'Welcome to my digital garden. I am a passionate developer who loves exploring the intersection of <strong>technology</strong> and <strong>design</strong>.',
        'about-skills': 'What I Do',
        'about-connect': 'Connect'
    },
    'zh': {
        'nav-overview': '首页',
        'nav-archive': '归档',
        'nav-about': '关于',
        'nav-github': 'GitHub',
        'hero-greeting': "你好，我是 YorkFr。",
        'hero-desc': '探索 <span style="color: var(--primary-color); font-weight: 500;">技术</span>、<span style="color: var(--accent-red); font-weight: 500;">设计</span> 与 <span style="color: var(--accent-green); font-weight: 500;">成长</span> 的交汇点。',
        'latest-articles': '最新文章',
        'view-archive': '查看归档 →',
        'read-article': '阅读全文',
        'back-home': '← 返回首页',
        'archive-title': '文章归档',
        'about-title': '关于 YorkFr',
        'about-greeting': "你好，我是 YorkFr。",
        'about-tagline': '开发者 / 设计师 / 终身学习者',
        'about-intro': '欢迎来到我的数字花园。我热衷于探索 <strong>技术</strong> 与 <strong>设计</strong> 的融合之美。',
        'about-skills': '我的技能',
        'about-connect': '联系我'
    }
};

function initLanguageSwitcher() {
    const langBtn = document.getElementById('lang-toggle');
    if (!langBtn) return;

    // Check saved language or default to 'en'
    let currentLang = localStorage.getItem('yorkfr-lang') || 'en';
    applyLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('yorkfr-lang', currentLang);
        applyLanguage(currentLang);
    });
}

function applyLanguage(lang) {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'en' ? '中' : 'En';
    }

    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';

    // Apply text to elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

/* --- Focus Mode (Full Screen Reading) --- */
function initFocusMode() {
    const focusBtn = document.getElementById('focus-mode-btn');
    if (!focusBtn) return;

    focusBtn.addEventListener('click', () => {
        document.body.classList.toggle('focus-mode');
        const isFocus = document.body.classList.contains('focus-mode');

        // Update icon
        focusBtn.innerHTML = isFocus
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>' // Exit Fullscreen Icon
            : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'; // Enter Fullscreen Icon

        // Optional: Save preference
        // localStorage.setItem('focus-mode', isFocus);
    });
}

/* --- Scroll Effects --- */
function initScrollEffects() {
    // Add scrolled class to body for header styling if needed
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });
}
