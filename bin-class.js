class Cart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = localStorage.getItem('gamebeta_cart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch(e) {
                this.items = [];
            }
        }
    }

    saveToStorage() {
        localStorage.setItem('gamebeta_cart', JSON.stringify(this.items));
        this.updateCounters();
    }

    addItem(game) {
        const existing = this.items.find(i => i.id === game.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({
                id: game.id,
                name: game.name,
                price: game.price,
                quantity: 1
            });
        }
        this.saveToStorage();
    }

    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.saveToStorage();
    }

    updateQuantity(id, newQty) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            if (newQty <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = newQty;
                this.saveToStorage();
            }
        }
    }

    getTotal() {
        return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    }

    getTotalCount() {
        return this.items.reduce((sum, i) => sum + i.quantity, 0);
    }

    clearCart() {
        this.items = [];
        this.saveToStorage();
    }

    updateCounters() {
        const counters = document.querySelectorAll('#cartCount');
        counters.forEach(el => {
            if (el) el.innerText = this.getTotalCount();
        });
    }
}