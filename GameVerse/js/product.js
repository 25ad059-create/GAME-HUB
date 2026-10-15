// Product details page logic that reads the selected product from the URL and renders it.
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-details');
    if (!productContainer) return;

    const params = new URLSearchParams(window.location.search);
    const rawId = params.get('id');
    // allow numeric id or slug (e.g. cyberpunk-2077)
    const game = findGameById(rawId);

    console.log('product.js: URL id param ->', rawId);
    if (game) console.log('product.js: matched game ->', game.name, '(id=' + game.id + ')');

    if (!game) {
        productContainer.innerHTML = '<div class="empty-state">This game could not be found.</div>';
        return;
    }

    const requirements = Object.entries(game.systemRequirements || {})
        .map(([key, value]) => `<li><span>${key.toUpperCase()}</span><strong>${value}</strong></li>`)
        .join('');

    const gameImage = window.resolveGameImage ? window.resolveGameImage(game) : (game.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80');

    productContainer.innerHTML = `
        <article class="detail-card">
            <div class="detail-hero">
                <div class="game-art" style="background: linear-gradient(135deg, rgba(157, 107, 255, 0.28), rgba(68, 216, 255, 0.08)), url('${gameImage}') center/cover no-repeat;"> </div>
            </div>

            <div class="detail-info">
                <span class="tag">${game.genre}</span>
                <div class="product-top">
                    <h2>${game.name}</h2>
                    <span class="price">${formatCurrency(game.price)}</span>
                </div>

                <div class="meta">
                    <span>⭐ ${game.rating}</span>
                    <span>PC</span>
                    <span>Digital Download</span>
                </div>

                <div class="detail-grid">
                    <div class="detail-copy">
                        <p>${game.description}</p>

                        <div class="detail-badges">
                            <span class="tag">Single Player</span>
                            <span class="tag">Co-op</span>
                            <span class="tag">Ultra Settings</span>
                        </div>

                        <div class="card-actions">
                            <button class="btn btn-primary detail-cta" data-game-id="${game.id}">Add to Cart</button>
                            <a href="products.html" class="btn btn-secondary">Back to Catalog</a>
                        </div>
                    </div>

                    <aside class="req-panel">
                        <h3>System Requirements</h3>
                        <ul class="req-list">${requirements}</ul>
                    </aside>
                </div>
            </div>
        </article>
    `;

    // Trailer section: appears below main details and requirements
    const trailerSection = document.createElement('section');
    trailerSection.className = 'product-trailer-section container section-block';
    trailerSection.innerHTML = `
        <div class="section-head">
            <div>
                <span class="section-kicker">OFFICIAL GAME TRAILER</span>
                <h2>Watch the official trailer</h2>
            </div>
        </div>

        <div class="trailer-wrapper panel-glow">
            <div class="video-shell">
                <iframe id="product-trailer-iframe" src="" title="${game.name} trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                <div id="product-trailer-fallback" class="trailer-fallback hidden">
                    <p>Trailer unavailable for this title.</p>
                    <a id="product-trailer-link" href="#" target="_blank" rel="noreferrer">Open on YouTube</a>
                </div>
            </div>
        </div>
    `;

    productContainer.appendChild(trailerSection);

    // Populate trailer player using YouTube IFrame API with robust fallback handling
    const playerContainerId = 'product-trailer-player-container';
    const iframeEl = document.getElementById('product-trailer-iframe');
    const fallback = document.getElementById('product-trailer-fallback');
    const trailerLink = document.getElementById('product-trailer-link');

    const videoId = game.youtubeId;
    const watchUrl = game.youtubeUrl || (`https://www.youtube.com/results?search_query=${encodeURIComponent(game.name + ' trailer')}`);

    console.log('product.js: trailer data ->', { videoId: videoId, trailerVerified: game.trailerVerified, watchUrl });

    function showFallback(reason) {
        // show a thumbnail and watch link
        iframeEl.style.display = 'none';
        fallback.classList.remove('hidden');
        const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
        // if thumbnail exists, show it as background
        if (thumbUrl) {
            fallback.style.backgroundImage = `url('${thumbUrl}')`;
            fallback.style.backgroundSize = 'cover';
            fallback.style.backgroundPosition = 'center';
        }
        trailerLink.href = watchUrl;
        trailerLink.textContent = 'Watch Trailer on YouTube';
        const reasonEl = fallback.querySelector('p');
        if (reasonEl) reasonEl.textContent = reason || 'Trailer unavailable for this title.';
    }

    function clearFallback() {
        iframeEl.style.display = '';
        fallback.classList.add('hidden');
        fallback.style.backgroundImage = '';
    }

    const canEmbed = !!(videoId && game.trailerVerified);

    if (!canEmbed) {
        // no verified video — show fallback only
        iframeEl.src = '';
        showFallback('Trailer not verified or missing.');
    } else {
        // Use youtube-nocookie embed for a simpler, reliable embed flow.
        clearFallback();

        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
        let loaded = false;

        // ensure iframe is visible and set src
        iframeEl.style.display = '';
        iframeEl.src = embedUrl;

        const onLoad = () => {
            loaded = true;
            console.log('product.js: trailer iframe loaded for', game.name);
            clearTimeout(loadTimeout);
            iframeEl.removeEventListener('load', onLoad);
            // hide fallback if any
            fallback.classList.add('hidden');
        };

        iframeEl.addEventListener('load', onLoad);

        const loadTimeout = setTimeout(() => {
            if (!loaded) {
                console.warn('product.js: trailer iframe load timed out for', game.name);
                try { iframeEl.style.display = 'none'; } catch (e) {}
                showFallback('Trailer failed to load or is blocked.');
            }
        }, 9000);
    }

    // Related games: same genre, exclude current
    const related = (window.gamesData || []).filter(g => g.genre === game.genre && g.id !== game.id).slice(0,4);
    if (related.length) {
        const relatedSection = document.createElement('section');
        relatedSection.className = 'related-games container section-block';
        relatedSection.innerHTML = `
            <div class="section-head"><div><span class="section-kicker">RELATED</span><h2>You may also like</h2></div></div>
            <div class="games-grid related-grid">
                ${related.map(r => `
                    <article class="product-card related-card">
                        <div class="game-art" style="background-image:url('${r.image}')"></div>
                        <div class="info">
                            <h4>${r.name}</h4>
                            <span class="tag">${r.genre}</span>
                            <div class="card-actions"><a class="link-btn" href="product.html?id=${window.slugifyGameTitle ? window.slugifyGameTitle(r.name) : r.id}">View</a></div>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;

        productContainer.appendChild(relatedSection);
    }

    productContainer.querySelector('[data-game-id]')?.addEventListener('click', () => addToCart(game.id));
});
