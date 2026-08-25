/**
 * Vision Pro & AI VR Interactive Showcase
 * Main Application Logic & Canvas Scroll Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    const frameCount = 240;

    /**
     * Helper to setup high-performance scroll frame sequence on an HTML5 canvas
     */
    function setupAnimation(canvasId, containerId, imagePathFunc) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const context = canvas.getContext("2d");
        const container = document.getElementById(containerId);
        if (!container) return;

        const images = [];
        let firstFrameLoaded = false;

        // Preload all 240 images for smooth scrubbing
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = imagePathFunc(i);
            images.push(img);

            img.onload = () => {
                if (!firstFrameLoaded && i === 1) {
                    firstFrameLoaded = true;
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                }
            };
        }

        // Scrub frame on window scroll
        window.addEventListener('scroll', () => {
            const rect = container.getBoundingClientRect();
            const scrolled = Math.max(0, -rect.top);
            const maxScrollTop = container.scrollHeight - window.innerHeight;

            const scrollFraction = Math.min(1, Math.max(0, scrolled / maxScrollTop));
            const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));

            requestAnimationFrame(() => {
                const currentImage = images[frameIndex];
                if (currentImage && currentImage.complete && currentImage.naturalWidth !== 0) {
                    canvas.width = currentImage.width;
                    canvas.height = currentImage.height;
                    context.drawImage(currentImage, 0, 0);
                }
            });
        }, { passive: true });
    }

    // Initialize First Scroll Animation (Hero spatial environment)
    setupAnimation(
        "scroll-canvas",
        "animation-container",
        index => `assets/frames/hero/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    );

    // Initialize Second Scroll Animation (VR Box interaction)
    setupAnimation(
        "scroll-canvas-2",
        "animation-container-2",
        index => `assets/frames/vr-box/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
    );
});
