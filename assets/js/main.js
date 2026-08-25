/**
 * Vision Pro & AI VR Interactive Showcase
 * Modular Component Loader & High-Performance Dual Canvas Scroll Engine
 */

document.addEventListener('DOMContentLoaded', async () => {
    const frameCount = 240;

    /**
     * Step 1: Modular Component Loader
     * Fetches and mounts all external HTML sections defined with [data-include]
     */
    async function loadComponents() {
        const elements = document.querySelectorAll('[data-include]');
        const loadPromises = Array.from(elements).map(async (el) => {
            const file = el.getAttribute('data-include');
            if (file) {
                try {
                    const response = await fetch(file);
                    if (response.ok) {
                        el.innerHTML = await response.text();
                    } else {
                        console.error(`Failed to load component: ${file}`);
                    }
                } catch (error) {
                    console.error(`Error loading component ${file}:`, error);
                }
            }
        });

        await Promise.all(loadPromises);
    }

    // Load all HTML components first
    await loadComponents();

    /**
     * Step 2: Ultra-Smooth 60fps Canvas Scroll Engine
     * Uses alpha:false 2D context, fixed canvas allocation (no per-frame reallocation),
     * requestAnimationFrame throttling, and lerp interpolation for butter-smooth scrubbing.
     */
    function setupAnimation(canvasId, containerId, imagePathFunc, totalFrames = 240) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        // Disable alpha channel for max GPU draw efficiency
        const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
        const container = document.getElementById(containerId);
        if (!container) return;

        const images = new Array(totalFrames);
        let targetFrame = 0;
        let currentFrame = 0;
        let lastDrawnFrame = -1;
        let isAnimating = false;
        let dimensionsSet = false;

        function setDimensions(img) {
            if (!dimensionsSet && img.naturalWidth && img.naturalHeight) {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                dimensionsSet = true;
            }
        }

        function drawFrame(frameIdx) {
            const roundedIdx = Math.min(totalFrames - 1, Math.max(0, Math.round(frameIdx)));
            if (roundedIdx === lastDrawnFrame) return;

            const img = images[roundedIdx];
            if (img && img.complete && img.naturalWidth > 0) {
                setDimensions(img);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                lastDrawnFrame = roundedIdx;
            }
        }

        function animateLoop() {
            // Smooth lerp for liquid-like scrubbing
            const diff = targetFrame - currentFrame;
            if (Math.abs(diff) > 0.01) {
                currentFrame += diff * 0.35; // 0.35 lerp speed for responsive yet smooth transitions
                drawFrame(currentFrame);
                requestAnimationFrame(animateLoop);
            } else {
                currentFrame = targetFrame;
                drawFrame(currentFrame);
                isAnimating = false;
            }
        }

        // Preload images into memory
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = imagePathFunc(i);
            images[i - 1] = img;

            img.onload = () => {
                if (i === 1) {
                    setDimensions(img);
                    drawFrame(0);
                }
            };
        }

        function calculateTargetFrame() {
            const rect = container.getBoundingClientRect();
            const scrolled = Math.max(0, -rect.top);
            const maxScroll = container.scrollHeight - window.innerHeight;

            if (maxScroll > 0) {
                const fraction = Math.min(1, Math.max(0, scrolled / maxScroll));
                targetFrame = fraction * (totalFrames - 1);

                if (!isAnimating) {
                    isAnimating = true;
                    requestAnimationFrame(animateLoop);
                }
            }
        }

        window.addEventListener('scroll', calculateTargetFrame, { passive: true });
        window.addEventListener('resize', calculateTargetFrame, { passive: true });
        calculateTargetFrame();
    }

    // Initialize First Scroll Animation (Hero spatial environment — 240 frames)
    setupAnimation(
        "scroll-canvas",
        "animation-container",
        index => `assets/frames/hero/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`,
        240
    );

    // Initialize Second Scroll Animation (VR Box interaction — 120 frames for exactly 1 single round)
    setupAnimation(
        "scroll-canvas-2",
        "animation-container-2",
        index => `assets/frames/vr-box/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`,
        120
    );
});
