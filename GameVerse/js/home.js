// Homepage logic for featured games, live search, and the gaming trailer player.
document.addEventListener('DOMContentLoaded', () => {
    const featureContainer = document.getElementById('featured-games');
    const homeSearchInput = document.getElementById('nav-search-input') || document.getElementById('homepage-search');
    const clearButton = document.getElementById('clear-home-search');
    const categoryContainer = document.getElementById('discover-categories') || document.querySelector('.discover-categories');
    const heroStats = document.getElementById('hero-stats');

    const categoryOptions = [
        { label: 'All Games', icon: '✦' },
        { label: 'Action', icon: '⚔' },
        { label: 'Adventure', icon: '🗺' },
        { label: 'Racing', icon: '🏁' },
        { label: 'RPG', icon: '🛡' },
        { label: 'Horror', icon: '☠' },
        { label: 'Survival', icon: '⛏' },
        { label: 'Multiplayer', icon: '🎮' }
    ];

    const normalizeCategory = (genre = '') => {
        if (!genre) return 'All Games';
        const lower = genre.toLowerCase();
        if (lower.includes('action')) return 'Action';
        if (lower.includes('adventure')) return 'Adventure';
        if (lower.includes('racing')) return 'Racing';
        if (lower.includes('rpg')) return 'RPG';
        if (lower.includes('horror')) return 'Horror';
        if (lower.includes('survival')) return 'Survival';
        if (lower.includes('moba') || lower.includes('fps') || lower.includes('co-op') || lower.includes('shooter') || lower.includes('battle royale')) return 'Multiplayer';
        return genre;
    };

    if (categoryContainer) {
        const categories = categoryOptions.map(({ label, icon }) => {
            const activeClass = label === 'All Games' ? 'active' : '';
            return `<button type="button" class="category-pill ${activeClass}" data-category="${label}"><span class="category-icon">${icon}</span>${label}</button>`;
        }).join('');

        categoryContainer.innerHTML = categories;

        categoryContainer.querySelectorAll('.category-pill').forEach((button) => {
            button.addEventListener('click', () => {
                const selected = button.dataset.category;
                categoryContainer.querySelectorAll('.category-pill').forEach((item) => item.classList.toggle('active', item === button));
                if (featureContainer) {
                    const games = window.gamesData || [];
                    const filtered = selected === 'All Games'
                        ? games.filter((game) => game.featured)
                        : games.filter((game) => normalizeCategory(game.genre) === selected && game.featured);

                    renderFeatured(filtered);
                }
            });
        });
    }

    if (heroStats) {
        const games = window.gamesData || [];
        const totalGames = games.length;
        const avgRating = games.length ? (games.reduce((sum, game) => sum + Number(game.rating || 0), 0) / games.length).toFixed(1) : '0.0';
        const featuredCount = games.filter((game) => game.featured).length;

        heroStats.innerHTML = `
            <div>
                <strong>${totalGames}</strong>
                <span>Games</span>
            </div>
            <div>
                <strong>${avgRating}</strong>
                <span>Avg. rating</span>
            </div>
            <div>
                <strong>${featuredCount}</strong>
                <span>Featured</span>
            </div>
        `;
    }

    const renderFeatured = (gamesToRender) => {
        if (!featureContainer) return;

        if (!gamesToRender.length) {
            featureContainer.innerHTML = '<div class="empty-state">No games found. Try another search.</div>';
            return;
        }

        featureContainer.innerHTML = gamesToRender.map((game, index) => {
            const badge = index === 0 ? 'BESTSELLER' : game.featured ? 'NEW RELEASE' : 'TOP PICK';
            const gameImage = window.resolveGameImage ? window.resolveGameImage(game) : (game.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80');
            return `
                <article class="product-card">
                    <div class="game-art" style="background: linear-gradient(135deg, rgba(157,107,255,0.28), rgba(68,216,255,0.08)), url('${gameImage}') center/cover no-repeat;">
                        <button type="button" class="favorite-btn" aria-label="Add ${game.name} to wishlist">♥</button>
                        <span class="badge">${badge}</span>
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
                            <button class="btn cart-btn" data-game-id="${game.id}" aria-label="Add ${game.name} to cart">Add to Cart</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        featureContainer.querySelectorAll('[data-game-id]').forEach((button) => {
            button.addEventListener('click', () => addToCart(button.dataset.gameId));
        });

        featureContainer.querySelectorAll('.favorite-btn').forEach((button) => {
            button.addEventListener('click', () => {
                button.classList.toggle('is-active');
                button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
            });
        });
    };

    const featuredGames = (window.gamesData || []).filter((game) => game.featured);
    renderFeatured(featuredGames);

    if (homeSearchInput) {
        const updateHomeSearch = () => {
            const query = homeSearchInput.value.trim().toLowerCase();
            const filtered = featuredGames.filter((game) => {
                const matches = (game.name || '').toLowerCase().includes(query) || (game.genre || '').toLowerCase().includes(query);
                return matches;
            });
            renderFeatured(filtered);
        };

        homeSearchInput.addEventListener('input', updateHomeSearch);
    }

    if (clearButton && homeSearchInput) {
        clearButton.addEventListener('click', () => {
            homeSearchInput.value = '';
            renderFeatured(featuredGames);
            homeSearchInput.focus();
        });
    }

    const trailerPlayer = document.getElementById('trailer-player');
    const trailerList = document.getElementById('trailer-list');
    const trailerFallback = document.getElementById('trailer-fallback');
    const trailerToggle = document.getElementById('trailer-toggle');
    const trailerMute = document.getElementById('trailer-mute');
    const trailerFullscreen = document.getElementById('trailer-fullscreen');

    if (trailerPlayer && trailerList) {
        let activePlayer = null;
        let isMuted = true;
        let isPlaying = false;

        const createTrailer = (videoId, title) => {
            if (!videoId) {
                trailerPlayer.innerHTML = '';
                if (trailerFallback) {
                    trailerFallback.textContent = 'Trailer unavailable right now. Please try another title.';
                    trailerFallback.classList.remove('hidden');
                }
                return null;
            }

            if (trailerFallback) {
                trailerFallback.classList.add('hidden');
            }

            trailerPlayer.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&mute=1"
                    title="${title} official trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
            `;

            const iframe = trailerPlayer.querySelector('iframe');
            if (!iframe) return null;

            iframe.style.border = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';

            return iframe;
        };

        const trailerData = [
            {
                id: 'cyberpunk',
                title: 'Cyberpunk 2077',
                genre: 'Sci-Fi RPG',
                thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
                videoId: 'P99qJGrPNLs',
                fallback: 'Official Cyberpunk 2077 trailer is temporarily unavailable.'
            },
            {
                id: 'elden-ring',
                title: 'Elden Ring',
                genre: 'Action RPG',
                thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
                videoId: 'E3Huy2cdih0',
                fallback: 'Official Elden Ring trailer is temporarily unavailable.'
            },
            {
                id: 'forza',
                title: 'Forza Horizon 5',
                genre: 'Racing',
                thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80',
                videoId: 'hC7v0thI4N8',
                fallback: 'Official Forza Horizon 5 trailer is temporarily unavailable.'
            },
            {
                id: 'hades',
                title: 'Hades',
                genre: 'Roguelike',
                thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
                videoId: '91t0C0dNQmQ',
                fallback: 'Official Hades trailer is temporarily unavailable.'
            }
        ];

        const renderTrailerList = () => {
            trailerList.innerHTML = trailerData.map((item) => `
                <button class="trailer-item" type="button" data-trailer-id="${item.id}" aria-label="Play ${item.title} trailer">
                    <img src="${item.thumbnail}" alt="${item.title} trailer thumbnail" loading="lazy">
                    <div class="trailer-item-copy">
                        <strong>${item.title}</strong>
                        <span>${item.genre}</span>
                    </div>
                </button>
            `).join('');

            trailerList.querySelectorAll('.trailer-item').forEach((button) => {
                button.addEventListener('click', () => {
                    const selected = trailerData.find((item) => item.id === button.dataset.trailerId);
                    if (!selected) return;
                    activePlayer = createTrailer(selected.videoId, selected.title);
                    isMuted = true;
                    isPlaying = true;
                    if (trailerToggle) trailerToggle.textContent = 'Pause';
                    if (trailerMute) trailerMute.textContent = 'Mute';
                });
            });
        };

        const setPlayerState = () => {
            if (!activePlayer) return;
            activePlayer.src = activePlayer.src.replace(/mute=\d/, `mute=${isMuted ? 1 : 0}`);
            if (isPlaying) {
                activePlayer.src = activePlayer.src.replace(/autoplay=\d/, 'autoplay=1');
            }
        };

        const initialTrailer = trailerData[0];
        activePlayer = createTrailer(initialTrailer.videoId, initialTrailer.title);
        renderTrailerList();

        if (trailerToggle) {
            trailerToggle.addEventListener('click', () => {
                if (!activePlayer) return;
                isPlaying = !isPlaying;
                trailerToggle.textContent = isPlaying ? 'Pause' : 'Play';
                const src = activePlayer.src;
                const autoplayValue = isPlaying ? 'autoplay=1' : 'autoplay=0';
                activePlayer.src = src.includes('autoplay=') ? src.replace(/autoplay=\d/, autoplayValue) : `${src}&autoplay=0`;
            });
        }

        if (trailerMute) {
            trailerMute.addEventListener('click', () => {
                if (!activePlayer) return;
                isMuted = !isMuted;
                trailerMute.textContent = isMuted ? 'Mute' : 'Unmute';
                const src = activePlayer.src;
                const muteValue = isMuted ? 'mute=1' : 'mute=0';
                activePlayer.src = src.includes('mute=') ? src.replace(/mute=\d/, muteValue) : `${src}&mute=0`;
            });
        }

        if (trailerFullscreen) {
            trailerFullscreen.addEventListener('click', () => {
                const iframe = trailerPlayer.querySelector('iframe');
                if (!iframe) return;
                if (iframe.requestFullscreen) iframe.requestFullscreen();
            });
        }

        setPlayerState();
    }
});
