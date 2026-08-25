/**
 * cart.js — Infinite V Cart State Manager
 * Persists cart items to localStorage, updates badge on load
 */

const InfiniteVCart = (() => {
    const CART_KEY = 'infinitev_cart';

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateBadge();
    }

    function addToCart(item) {
        const cart = getCart();
        // Check if same model+tier already exists
        const existingIdx = cart.findIndex(c => c.id === item.id);
        if (existingIdx > -1) {
            cart[existingIdx].qty = (cart[existingIdx].qty || 1) + 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        saveCart(cart);
        showCartToast(item.name);
    }

    function removeItem(id) {
        const cart = getCart().filter(c => c.id !== id);
        saveCart(cart);
    }

    function updateQty(id, qty) {
        const cart = getCart();
        const idx = cart.findIndex(c => c.id === id);
        if (idx > -1) {
            if (qty <= 0) {
                cart.splice(idx, 1);
            } else {
                cart[idx].qty = qty;
            }
        }
        saveCart(cart);
    }

    function clearCart() {
        localStorage.removeItem(CART_KEY);
        updateBadge();
    }

    function getTotal() {
        return getCart().reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    }

    function getItemCount() {
        return getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
    }

    function updateBadge() {
        const count = getItemCount();
        document.querySelectorAll('[data-cart-badge]').forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
        document.querySelectorAll('[data-cart-count]').forEach(el => {
            el.textContent = count;
        });
    }

    function showCartToast(name) {
        const existing = document.getElementById('cart-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:28px;height:28px;border-radius:50%;background:#ff6a00;display:flex;align-items:center;justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                    <div style="font-size:0.75rem;font-weight:600;color:#fff">Added to Cart</div>
                    <div style="font-size:0.7rem;color:rgba(255,255,255,0.6)">${name}</div>
                </div>
                <a href="cart.html" style="margin-left:8px;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#ff6a00;text-decoration:none;white-space:nowrap">View Cart →</a>
            </div>`;
        toast.style.cssText = `
            position:fixed;bottom:28px;right:28px;z-index:9999;
            padding:16px 20px;border-radius:16px;
            background:rgba(10,10,10,0.95);border:1px solid rgba(255,255,255,0.12);
            backdrop-filter:blur(20px);box-shadow:0 20px 50px rgba(0,0,0,0.6);
            animation:slideUp 0.3s ease forwards;`;

        // Add CSS animation
        if (!document.getElementById('cart-toast-style')) {
            const style = document.createElement('style');
            style.id = 'cart-toast-style';
            style.textContent = `@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // Initialize badge on DOM ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateBadge);
        } else {
            updateBadge();
        }
    }

    init();

    return { addToCart, removeItem, updateQty, clearCart, getCart, getTotal, getItemCount, updateBadge };
})();

// Global shortcut
window.Cart = InfiniteVCart;
