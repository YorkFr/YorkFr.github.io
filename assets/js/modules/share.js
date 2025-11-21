/* Social Share Module */

export function initShare() {
    // Only run on post pages
    const postFooter = document.querySelector('.post-footer-clean');
    if (!postFooter) return;

    // Get post info
    const postTitle = document.querySelector('.post-title-clean')?.textContent || document.title;
    const postUrl = window.location.href;

    // Create share container
    const shareContainer = document.createElement('div');
    shareContainer.className = 'share-container';
    shareContainer.innerHTML = `
        <div class="share-header">
            <i class="ph ph-share-network"></i>
            <span>Share this post</span>
        </div>
        <div class="share-buttons">
            <button class="share-btn share-twitter" data-platform="twitter" title="Share on Twitter/X" aria-label="Share on Twitter">
                <i class="ph ph-x-logo"></i>
            </button>
            <button class="share-btn share-linkedin" data-platform="linkedin" title="Share on LinkedIn" aria-label="Share on LinkedIn">
                <i class="ph ph-linkedin-logo"></i>
            </button>
            <button class="share-btn share-facebook" data-platform="facebook" title="Share on Facebook" aria-label="Share on Facebook">
                <i class="ph ph-facebook-logo"></i>
            </button>
            <button class="share-btn share-copy" data-platform="copy" title="Copy link" aria-label="Copy link">
                <i class="ph ph-link"></i>
            </button>
        </div>
    `;

    // Insert before the back button
    postFooter.insertBefore(shareContainer, postFooter.firstChild);

    // Share handlers
    const shareButtons = shareContainer.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.dataset.platform;
            
            switch (platform) {
                case 'twitter':
                    shareToTwitter(postTitle, postUrl);
                    break;
                case 'linkedin':
                    shareToLinkedIn(postUrl);
                    break;
                case 'facebook':
                    shareToFacebook(postUrl);
                    break;
                case 'copy':
                    copyToClipboard(postUrl, btn);
                    break;
            }
        });
    });
}

function shareToTwitter(title, url) {
    const text = encodeURIComponent(title);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareToLinkedIn(url) {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareToFacebook(url) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function copyToClipboard(url, btn) {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showCopySuccess(btn);
        }).catch(err => {
            console.error('Clipboard API failed:', err);
            fallbackCopy(url, btn);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(url, btn);
    }
}

function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(btn);
        } else {
            console.error('Fallback copy failed');
        }
    } catch (err) {
        console.error('Fallback copy error:', err);
    } finally {
        document.body.removeChild(textarea);
    }
}

function showCopySuccess(btn) {
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-check"></i>';
    btn.classList.add('copied');
    
    setTimeout(() => {
        btn.innerHTML = originalIcon;
        btn.classList.remove('copied');
    }, 2000);
}
