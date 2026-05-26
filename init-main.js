document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    const catalog = new GameCatalog(gamesData, cart);
    catalog.renderCatalog();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            catalog.filterByGenre(btn.dataset.genre);
        });
    });

    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            catalog.setSort(btn.dataset.sort);
        });
    });

    const searchInput = document.getElementById('searchInput');
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => catalog.search(e.target.value), 300);
    });

    cart.updateCounters();
});