// Prefer explicit TRAILER_DATA if provided. Fallback to existing gamesData mapping.
const trailerGames = (window.TRAILER_DATA || window.gamesData || []).map((game) => {
  if (window.TRAILER_DATA) {
    return {
      id: game.id,
      title: game.title,
      genre: game.genre,
      image: game.image,
      youtubeId: game.trailer && game.trailer.videoId,
      youtubeUrl: game.trailer && (game.trailer.watchUrl || game.trailer.fallbackSearch),
      verified: game.trailer && !!game.trailer.verified
    };
  }

  return {
    id: game.id,
    title: game.name,
    genre: game.genre,
    image: window.resolveGameImage ? window.resolveGameImage(game) : game.image,
    youtubeId: game.youtubeId,
    youtubeUrl: game.youtubeUrl,
    verified: !!game.youtubeId
  };
});

const galleryEl = document.getElementById('trailer-grid');
const activeTitleEl = document.getElementById('active-title');
const activeGenreEl = document.getElementById('active-genre');
const iframeEl = document.getElementById('trailer-iframe');
const fallbackEl = document.getElementById('trailer-fallback');
const youtubeLinkEl = document.getElementById('youtube-link');

let activeGameId = trailerGames[0]?.id || null;

// search + filters
const searchInput = document.getElementById('trailer-search');
const clearBtn = document.getElementById('clear-search');
const filterFieldset = document.querySelector('.filter-row');

function getActiveFilters() {
  if (!filterFieldset) return new Set();
  return new Set(Array.from(filterFieldset.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value));
}

function filterAndRender() {
  const q = (searchInput && searchInput.value || '').trim().toLowerCase();
  const activeFilters = getActiveFilters();

  const list = trailerGames.filter(game => {
    if (activeFilters.size && !activeFilters.has(game.genre)) return false;
    if (!q) return true;
    return (game.title || '').toLowerCase().includes(q) || (game.genre || '').toLowerCase().includes(q);
  });

  renderCards(list);
}

const setFallbackVisible = (game) => {
  fallbackEl.classList.remove('hidden');
  youtubeLinkEl.href = game.youtubeUrl || ('https://www.youtube.com/results?search_query=' + encodeURIComponent(game.title + ' trailer'));
  youtubeLinkEl.textContent = `Open ${game.title} on YouTube`;
};

const setActiveGame = (game) => {
  activeGameId = game.id;
  activeTitleEl.textContent = game.title;
  activeGenreEl.textContent = game.genre;

  // Only attempt to embed when we have a verified youtubeId.
  if (game.youtubeId && game.verified) {
    const embedUrl = `https://www.youtube.com/embed/${game.youtubeId}?rel=0&modestbranding=1&playsinline=1&controls=1&fs=1`;
    // hide fallback until we know embed failed
    fallbackEl.classList.add('hidden');
    iframeEl.src = embedUrl;
    iframeEl.title = `${game.title} trailer`;
    iframeEl.dataset.loaded = 'false';

    window.clearTimeout(window.trailerFallbackTimer);
    window.trailerFallbackTimer = window.setTimeout(() => {
      if (iframeEl.dataset.loaded !== 'true') {
        setFallbackVisible(game);
        iframeEl.src = '';
      }
    }, 9000);

  } else {
    // No verified embed available — show fallback immediately and clear iframe
    iframeEl.src = '';
    iframeEl.dataset.loaded = 'false';
    setFallbackVisible(game);
  }
};

const renderCards = (list = trailerGames) => {
  galleryEl.innerHTML = list.length ? list
    .map((game) => `
      <button class="trailer-card${game.id === activeGameId ? ' active' : ''}" type="button" data-game-id="${game.id}" aria-label="Play ${game.title} trailer">
        <div class="card-thumb-shell">
          <img src="${game.image}" alt="${game.title} cover art" onerror="this.closest('.card-thumb-shell').classList.add('fallback-mode'); this.style.display='none'; const fallbackText = this.parentElement.querySelector('.fallback-text'); if (fallbackText) fallbackText.textContent = this.getAttribute('alt');" data-fallback="${game.title}">
          <div class="fallback-text" aria-hidden="true">${game.title}</div>
        </div>
        <div class="card-copy">
          <h3>${game.title}</h3>
          <span class="genre-pill">${game.genre}</span>
        </div>
      </button>
    `).join('') : '<div class="no-results">No results match your search or selected categories.</div>';

  const cardButtons = galleryEl.querySelectorAll('.trailer-card');
  cardButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = trailerGames.find((game) => String(game.id) === String(button.dataset.gameId));
      if (!selected) return;

      galleryEl.querySelectorAll('.trailer-card').forEach((card) => card.classList.toggle('active', card === button));
      setActiveGame(selected);
    });
  });
};

iframeEl.addEventListener('load', () => {
  iframeEl.dataset.loaded = 'true';
  fallbackEl.classList.add('hidden');
});

iframeEl.addEventListener('error', () => {
  const active = trailerGames.find((game) => Number(game.id) === Number(activeGameId));
  if (active) setFallbackVisible(active);
});

// wire search + filters
if (searchInput) searchInput.addEventListener('input', filterAndRender);
if (clearBtn) clearBtn.addEventListener('click', () => { if (searchInput) { searchInput.value = ''; filterAndRender(); } });
if (filterFieldset) filterFieldset.addEventListener('change', filterAndRender);

// initial render and active
filterAndRender();
const initialGame = trailerGames.find(g => String(g.id) === String(activeGameId)) || trailerGames[0] || null;
if (initialGame) setActiveGame(initialGame);
