// Shared storefront logic used across the website.
// This file centralizes cart management and formatting helpers so pages behave consistently.

const formatCurrency = (value) => {
    const numericValue = Number(value) || 0;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(numericValue);
};

const getCart = () => {
    try {
        return JSON.parse(localStorage.getItem('gameverse-cart')) || [];
    } catch (error) {
        console.error('Unable to load cart from localStorage:', error);
        return [];
    }
};

const saveCart = (cart) => {
    localStorage.setItem('gameverse-cart', JSON.stringify(cart));
    updateCartCount();
};

const updateCartCount = () => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const cartCount = document.getElementById('cart-count');

    if (cartCount) {
        cartCount.textContent = String(totalItems);
    }
};

const findGameById = (gameId) => {
    const games = window.gamesData || [];
    if (gameId === undefined || gameId === null) return undefined;
    // if numeric id provided, match by id
    if (!isNaN(Number(gameId))) {
        return games.find((game) => Number(game.id) === Number(gameId));
    }

    // otherwise treat as slug; normalize and compare
    const slug = String(gameId).toLowerCase().replace(/['’]/g, '').replace(/&/g, 'and').replace(/[:,.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
    return games.find((game) => {
        const nameSlug = String(game.name || '').toLowerCase().replace(/['’]/g, '').replace(/&/g, 'and').replace(/[:,.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
        return nameSlug === slug || (String(game.id) === String(gameId));
    });
};

const slugifyGameTitle = (name = '') => {
    return String(name)
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/&/g, 'and')
        .replace(/[:,.]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
};

// expose slugify for other modules
window.slugifyGameTitle = slugifyGameTitle;

const addToCart = (gameId) => {
    const cart = getCart();
    const existingItem = cart.find((item) => Number(item.id) === Number(gameId));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: Number(gameId), quantity: 1 });
    }

    saveCart(cart);
    alert('Item added to your cart.');
};

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
