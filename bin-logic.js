document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    const cartContainer = document.getElementById('cartItemsList');
    const totalSpan = document.getElementById('cartTotalSum');
    const emailInput = document.getElementById('email');
    const formError = document.getElementById('formError');
    const orderForm = document.getElementById('orderForm');

    function renderCart() {
        if (!cartContainer) return;
        if (cart.items.length === 0) {
            cartContainer.innerHTML = '<p>Корзина пуста. <a href="1.html">Вернуться в каталог</a></p>';
            totalSpan.innerText = 'Итого: 0 ₽';
            return;
        }
        let html = '';
        cart.items.forEach(item => {
            html += `
                <div class="cart-item">
                    <div><strong>${item.name}</strong><br>${item.price} ₽ × ${item.quantity}</div>
                    <div>
                        <button class="cart-inc" data-id="${item.id}">+</button>
                        <span>${item.quantity}</span>
                        <button class="cart-dec" data-id="${item.id}">-</button>
                        <button class="cart-remove" data-id="${item.id}">🗑</button>
                    </div>
                </div>
            `;
        });
        cartContainer.innerHTML = html;
        totalSpan.innerText = `Итого: ${cart.getTotal()} ₽`;

        document.querySelectorAll('.cart-inc').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.items.find(i => i.id === id);
                if (item) cart.updateQuantity(id, item.quantity + 1);
                renderCart();
            });
        });
        document.querySelectorAll('.cart-dec').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.items.find(i => i.id === id);
                if (item) cart.updateQuantity(id, item.quantity - 1);
                renderCart();
            });
        });
        document.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                cart.removeItem(id);
                renderCart();
            });
        });
    }

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        if (!email) {
            formError.innerText = 'Введите email';
            return;
        }
        if (!emailRegex.test(email)) {
            formError.innerText = 'Некорректный email';
            return;
        }
        if (cart.getTotalCount() === 0) {
            formError.innerText = 'Корзина пуста';
            return;
        }
        alert(`✅ Заказ оформлен!\nEmail: ${email}\nСумма: ${cart.getTotal()} ₽\nБета-ключи будут отправлены.`);
        cart.clearCart();
        renderCart();
        emailInput.value = '';
        formError.innerText = '';
    });

    renderCart();
    cart.updateCounters();
});