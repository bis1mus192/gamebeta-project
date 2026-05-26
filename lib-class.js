class GameCatalog {
    constructor(games, cart) {
        this.allGames = [...games];
        this.filteredGames = [...games];
        this.currentGenre = 'all';
        this.currentSort = 'price';
        this.searchQuery = '';
        this.cart = cart;
    }

    filterByGenre(genre) {
        this.currentGenre = genre;
        this.applyFilters();
    }

    search(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    }

    setSort(sortType) {
        this.currentSort = sortType;
        this.applyFilters();
    }

    applyFilters() {
        let result = [...this.allGames];
        if (this.currentGenre !== 'all') {
            result = result.filter(g => g.genre === this.currentGenre);
        }
        if (this.searchQuery) {
            result = result.filter(g => g.name.toLowerCase().includes(this.searchQuery));
        }
        if (this.currentSort === 'name') {
            result.sort((a,b) => a.name.localeCompare(b.name));
        } else if (this.currentSort === 'price') {
            result.sort((a,b) => a.price - b.price);
        } else if (this.currentSort === 'price-desc') {
            result.sort((a,b) => b.price - a.price);
        }
        this.filteredGames = result;
        this.renderCatalog();
    }

    renderCatalog() {
        const container = document.getElementById('catalogContainer');
        if (!container) return;
        if (this.filteredGames.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:3rem;">😕 Ничего не найдено</div>';
            return;
        }
        container.innerHTML = this.filteredGames.map(game => `
            <div class="game-card">
                <img src="${game.img}" alt="${game.name}">
                <span class="genre">${game.genre}</span>
                <h3>${game.name}</h3>
                <p style="margin:0 1rem 0.5rem; color:#666;">${game.desc}</p>
                <div class="price">${game.price} ₽</div>
                <button class="add-to-cart" data-id="${game.id}">🎮 Добавить бета-ключ</button>
            </div>
        `).join('');

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                const game = this.allGames.find(g => g.id === id);
                if (game) {
                    this.cart.addItem(game);
                    this.showToast(`✅ ${game.name} добавлен в корзину`);
                }
            });
        });
    }

    showToast(msg) {
        const toast = document.createElement('div');
        toast.innerText = msg;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '20px';
        toast.style.backgroundColor = '#060C2F';
        toast.style.color = 'white';
        toast.style.padding = '8px 20px';
        toast.style.borderRadius = '40px';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}