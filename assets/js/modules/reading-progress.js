/* Reading Progress Indicator Module */

export function initReadingProgress() {
    // Only run on post pages
    const postContent = document.querySelector('.post-content-clean');
    if (!postContent) return;

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Reading progress');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    
    const progressFill = document.createElement('div');
    progressFill.className = 'reading-progress-fill';
    progressBar.appendChild(progressFill);
    
    document.body.appendChild(progressBar);

    // Calculate and update progress
    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const progress = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
        
        progressFill.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    // Initial update
    updateProgress();
}
