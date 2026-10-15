// Catalog logic for searching, filtering, and sorting the game inventory.
document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');
    const sortSelect = document.getElementById('sort-select');
    const clearSearchButton = document.getElementById('clear-search');

    if (!catalogGrid || !searchInput || !genreFilter || !sortSelect) return;

    const games = window.gamesData || [];
    const genres = [...new Set(games.map((game) => game.genre))];

    genreFilter.innerHTML = '<option value="all">All Genres</option>' + genres
        .map((genre) => `<option value="${genre}">${genre}</option>`)
        .join('');

    const updateCatalog = () => {
        const query = searchInput.value.trim().toLowerCase();
        const selectedGenre = genreFilter.value;
        const sortValue = sortSelect.value;

        let filteredGames = games.filter((game) => {
            const normalizedName = (game.name || '').trim().toLowerCase();
            const normalizedGenre = (game.genre || '').trim().toLowerCase();
            const matchesSearch = normalizedName.includes(query) || normalizedGenre.includes(query);
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
            catalogGrid.innerHTML = '<div class="empty-state">No games found. Try another search.</div>';
            return;
        }

        catalogGrid.innerHTML = filteredGames.map((game) => {
            const gameImage = window.resolveGameImage ? window.resolveGameImage(game) : (game.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80');
            return `
            <article class="product-card">
                <div class="game-art" style="background: linear-gradient(135deg, rgba(157,107,255,0.28), rgba(68,216,255,0.08)), url('${gameImage}') center/cover no-repeat;">
                    <span class="badge">${game.featured ? 'FEATURED' : 'PC'}</span>
                </div>
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
        `;}).join('');

        catalogGrid.querySelectorAll('[data-game-id]').forEach((button) => {
            button.addEventListener('click', () => addToCart(button.dataset.gameId));
        });
    };

    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', () => {
            searchInput.value = '';
            genreFilter.value = 'all';
            sortSelect.value = 'featured';
            updateCatalog();
            searchInput.focus();
        });
    }

    searchInput.addEventListener('input', updateCatalog);
    genreFilter.addEventListener('change', updateCatalog);
    sortSelect.addEventListener('change', updateCatalog);
    updateCatalog();
});
