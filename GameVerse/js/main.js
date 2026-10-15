// Main shared JavaScript for the GameVerse storefront.
// This file handles the homepage, catalog rendering, cart logic, and checkout behaviour.

const formatCurrency = (value) => `$${Number(value).toFixed(2)}`;

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
};

const findGameById = (gameId) => {
    const games = window.gamesData || [];
    if (gameId === undefined || gameId === null) return undefined;
    if (!isNaN(Number(gameId))) {
        return games.find((game) => Number(game.id) === Number(gameId));
    }
    const slug = String(gameId).toLowerCase().replace(/['’]/g, '').replace(/&/g, 'and').replace(/[:,.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
    return games.find((game) => {
        const nameSlug = String(game.name || '').toLowerCase().replace(/['’]/g, '').replace(/&/g, 'and').replace(/[:,.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-');
        return nameSlug === slug || (String(game.id) === String(gameId));
    });
};

const addToCart = (gameId) => {
    const cart = getCart();
    const existingItem = cart.find((item) => Number(item.id) === Number(gameId));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: Number(gameId), quantity: 1 });
    }

    saveCart(cart);
    alert('Item added to cart.');
};

const renderFeaturedGames = () => {
    const featureContainer = document.getElementById('featured-games');
    if (!featureContainer) return;

    const featuredGames = (window.gamesData || []).filter((game) => game.featured);

    featureContainer.innerHTML = featuredGames.map((game) => `
        <article class="product-card">
            <div class="game-art">🎮</div>
            <div class="info">
                <div class="product-top">
                    <h3>${game.name}</h3>
                    <span class="price">${formatCurrency(game.price)}</span>
                </div>
                <span class="tag">${game.genre}</span>
                <div class="meta">
                    <span>⭐ ${game.rating}</span>
                    <span>${game.systemRequirements.os}</span>
                </div>
                <p>${game.description}</p>
                        <div class="card-actions">
                            <a class="link-btn" href="product.html?id=${window.slugifyGameTitle ? window.slugifyGameTitle(game.name) : game.id}">View Details</a>
                    <button class="btn btn-primary" data-game-id="${game.id}">Add to Cart</button>
                </div>
            </div>
        </article>
    `).join('');

    featureContainer.querySelectorAll('[data-game-id]').forEach((button) => {
        button.addEventListener('click', () => addToCart(button.dataset.gameId));
    });
};

const renderCatalog = () => {
    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');
    const sortSelect = document.getElementById('sort-select');

    if (!catalogGrid || !searchInput || !genreFilter || !sortSelect) return;

    const games = window.gamesData || [];
    const genres = [...new Set(games.map((game) => game.genre))];
    genreFilter.innerHTML = '<option value="all">All Genres</option>' + genres.map((genre) => `
        <option value="${genre}">${genre}</option>
    `).join('');

    const updateCatalog = () => {
        const query = searchInput.value.trim().toLowerCase();
        const selectedGenre = genreFilter.value;
        const sortValue = sortSelect.value;

        let filteredGames = games.filter((game) => {
            const matchesSearch = game.name.toLowerCase().includes(query) || game.genre.toLowerCase().includes(query);
            const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
            return matchesSearch && matchesGenre;
        });

        const sortStrategies = {
            featured: (a, b) => Number(b.featured) - Number(a.featured),
            'name-asc': (a, b) => a.name.localeCompare(b.name),
            'name-desc': (a, b) => b.name.localeCompare(a.name),
            'price-low': (a, b) => a.price - b.price,
            'price-high': (a, b) => b.price - a.price,
            rating: (a, b) => b.rating - a.rating
        };

        filteredGames.sort(sortStrategies[sortValue] || sortStrategies.featured);

        if (!filteredGames.length) {
            catalogGrid.innerHTML = '<div class="empty-state">No games match your filters. Try a different search.</div>';
            return;
        }

        catalogGrid.innerHTML = filteredGames.map((game) => `
            <article class="product-card">
                <div class="game-art">🎮</div>
                <div class="info">
                    <div class="product-top">
                        <h3>${game.name}</h3>
                        <span class="price">${formatCurrency(game.price)}</span>
                    </div>
                    <span class="tag">${game.genre}</span>
                    <div class="meta">
                        <span>⭐ ${game.rating}</span>
                        <span>PC</span>
                    </div>
                    <p>${game.description}</p>
                    <div class="card-actions">
                        <a class="link-btn" href="product.html?id=${window.slugifyGameTitle ? window.slugifyGameTitle(game.name) : game.id}">View Details</a>
                        <button class="btn btn-primary" data-game-id="${game.id}">Add to Cart</button>
                    </div>
                </div>
            </article>
        `).join('');

        catalogGrid.querySelectorAll('[data-game-id]').forEach((button) => {
            button.addEventListener('click', () => addToCart(button.dataset.gameId));
        });
    };

    searchInput.addEventListener('input', updateCatalog);
    genreFilter.addEventListener('change', updateCatalog);
    sortSelect.addEventListener('change', updateCatalog);
    updateCatalog();
};

const renderProductPage = () => {
    const productContainer = document.getElementById('product-details');
    if (!productContainer) return;

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));
    const game = findGameById(productId);

    if (!game) {
        productContainer.innerHTML = '<div class="empty-state">This game could not be found.</div>';
        return;
    }

    const requirementsHtml = Object.entries(game.systemRequirements)
        .map(([key, value]) => `<li><strong>${key.toUpperCase()}:</strong> ${value}</li>`)
        .join('');

    productContainer.innerHTML = `
        <div class="product-card">
            <div class="game-art" style="height: 260px;">🎮</div>
            <div class="info">
                <span class="tag">${game.genre}</span>
                <div class="product-top">
                    <h2>${game.name}</h2>
                    <span class="price">${formatCurrency(game.price)}</span>
                </div>
                <div class="meta">
                    <span>⭐ ${game.rating}</span>
                    <span>PC</span>
                </div>
                <p>${game.description}</p>
                <div class="card-actions">
                    <button class="btn btn-primary" data-game-id="${game.id}">Add to Cart</button>
                </div>
                <h3>System Requirements</h3>
                <ul>${requirementsHtml}</ul>
            </div>
        </div>
    `;

    productContainer.querySelector('[data-game-id]')?.addEventListener('click', () => addToCart(game.id));
};

const renderCartPage = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    if (!cartItemsContainer || !cartSummary) return;

    const cart = getCart();
    if (!cart.length) {
        cartItemsContainer.innerHTML = '<div class="empty-state">Your cart is empty. Browse the catalog to add games.</div>';
        cartSummary.innerHTML = '<div class="summary-row total"><span>Total</span><span>$0.00</span></div>';
        return;
    }

    const cartRows = cart.map((item) => {
        const game = findGameById(item.id);
        if (!game) return '';
        return `
            <tr data-cart-item="${item.id}">
                <td>${game.name}</td>
                <td>${game.genre}</td>
                <td>${formatCurrency(game.price)}</td>
                <td>
                    <div class="qty-controls">
                        <button data-action="decrease" data-game-id="${game.id}">-</button>
                        <span>${item.quantity}</span>
                        <button data-action="increase" data-game-id="${game.id}">+</button>
                    </div>
                </td>
                <td>${formatCurrency(game.price * item.quantity)}</td>
                <td><button class="btn btn-secondary" data-action="remove" data-game-id="${game.id}">Remove</button></td>
            </tr>
        `;
    }).join('');

    cartItemsContainer.innerHTML = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>${cartRows}</tbody>
        </table>
    `;

    const total = cart.reduce((sum, item) => {
        const game = findGameById(item.id);
        return game ? sum + (game.price * item.quantity) : sum;
    }, 0);

    cartSummary.innerHTML = `
        <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(total)}</span></div>
        <div class="summary-row"><span>Tax</span><span>${formatCurrency(total * 0.08)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatCurrency(total * 1.08)}</span></div>
        <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
    `;

    cartItemsContainer.querySelectorAll('[data-action]').forEach((button) => {
        const gameId = Number(button.dataset.gameId);
        const action = button.dataset.action;

        button.addEventListener('click', () => {
            const cartItems = getCart();
            const item = cartItems.find((entry) => Number(entry.id) === gameId);

            if (!item) return;

            if (action === 'increase') item.quantity += 1;
            if (action === 'decrease') item.quantity -= 1;
            if (action === 'remove') {
                const filtered = cartItems.filter((entry) => Number(entry.id) !== gameId);
                saveCart(filtered);
                renderCartPage();
                return;
            }

            if (item.quantity <= 0) {
                saveCart(cartItems.filter((entry) => Number(entry.id) !== gameId));
            } else {
                saveCart(cartItems);
            }

            renderCartPage();
        });
    });
};

const renderCheckoutPage = () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const cart = getCart();
    const summary = document.getElementById('checkout-summary');

    if (!cart.length) {
        summary.innerHTML = '<div class="empty-state">Your cart is empty. Add games before checking out.</div>';
        return;
    }

    const total = cart.reduce((sum, item) => {
        const game = findGameById(item.id);
        return game ? sum + (game.price * item.quantity) : sum;
    }, 0);

    summary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map((item) => {
            const game = findGameById(item.id);
            return game ? `<div class="summary-row"><span>${game.name} x ${item.quantity}</span><span>${formatCurrency(game.price * item.quantity)}</span></div>` : '';
        }).join('')}
        <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(total)}</span></div>
        <div class="summary-row"><span>Tax</span><span>${formatCurrency(total * 0.08)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatCurrency(total * 1.08)}</span></div>
    `;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const fullName = formData.get('fullName').toString().trim();
        const email = formData.get('email').toString().trim();
        const address = formData.get('address').toString().trim();
        const city = formData.get('city').toString().trim();
        const country = formData.get('country').toString().trim();
        const zip = formData.get('zip').toString().trim();
        const card = formData.get('card').toString().trim();

        const errors = [];

        if (fullName.length < 3) errors.push(['fullName', 'Please enter your full name.']);
        if (!email.includes('@')) errors.push(['email', 'Please enter a valid email address.']);
        if (address.length < 5) errors.push(['address', 'Please enter your shipping address.']);
        if (city.length < 2) errors.push(['city', 'Please enter your city.']);
        if (country.length < 2) errors.push(['country', 'Please select your country.']);
        if (zip.length < 4) errors.push(['zip', 'Please enter a valid zip code.']);
        if (card.length < 12) errors.push(['card', 'Please enter a valid card number.']);

        document.querySelectorAll('.form-error').forEach((element) => {
            element.textContent = '';
        });

        if (errors.length) {
            errors.forEach(([fieldName, message]) => {
                const target = document.querySelector(`[data-error="${fieldName}"]`);
                if (target) target.textContent = message;
            });
            return;
        }

        const successBox = document.getElementById('checkout-success');
        if (successBox) {
            successBox.classList.add('visible');
            successBox.textContent = `Thank you, ${fullName}! Your order has been placed successfully. A confirmation email will be sent to ${email}.`;
        }

        form.reset();
        localStorage.removeItem('gameverse-cart');
        summary.innerHTML = '<div class="empty-state">Order confirmed. Your cart has been cleared.</div>';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedGames();
    renderCatalog();
    renderProductPage();
    renderCartPage();
    renderCheckoutPage();
});
