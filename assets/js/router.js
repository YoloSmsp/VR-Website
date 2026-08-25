/**
 * router.js — Infinite V Active Nav Highlighter
 * Reads current page URL and marks the active nav link
 */
(function () {
    function highlightNav() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('[data-nav-link]').forEach(link => {
            const target = link.getAttribute('data-nav-link');
            const isActive = path === target || (path === '' && target === 'index.html');
            if (isActive) {
                link.classList.add('nav-active');
                link.classList.remove('text-white/60');
                link.classList.add('text-white');
                const indicator = link.querySelector('[data-nav-indicator]');
                if (indicator) indicator.style.display = 'block';
            } else {
                link.classList.remove('nav-active');
                const indicator = link.querySelector('[data-nav-indicator]');
                if (indicator) indicator.style.display = 'none';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', highlightNav);
    } else {
        highlightNav();
    }
    // Re-run after components load (500ms delay)
    setTimeout(highlightNav, 600);
})();
