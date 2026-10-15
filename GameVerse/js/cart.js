// Cart page logic for adjusting quantities, removing items, and recalculating totals.
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartItemsContainer || !cartSummary) return;

    const renderCart = () => {
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
                    <td data-label="Game">${game.name}</td>
                    <td data-label="Genre">${game.genre}</td>
                    <td data-label="Price">${formatCurrency(game.price)}</td>
                    <td data-label="Quantity">
                        <div class="qty-controls">
                            <button data-action="decrease" data-game-id="${game.id}" aria-label="Decrease quantity">-</button>
                            <span>${item.quantity}</span>
                            <button data-action="increase" data-game-id="${game.id}" aria-label="Increase quantity">+</button>
                        </div>
                    </td>
                    <td data-label="Total">${formatCurrency(game.price * item.quantity)}</td>
                    <td data-label="Remove"><button class="btn btn-secondary" data-action="remove" data-game-id="${game.id}">Remove</button></td>
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
            <h3>Order Summary</h3>
            <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(total)}</span></div>
            <div class="summary-row"><span>Tax</span><span>${formatCurrency(total * 0.08)}</span></div>
            <div class="summary-row total"><span>Total</span><span>${formatCurrency(total * 1.08)}</span></div>
            <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
        `;

        cartItemsContainer.querySelectorAll('[data-action]').forEach((button) => {
            const gameId = Number(button.dataset.gameId);
            const action = button.dataset.action;

            button.addEventListener('click', () => {
                const currentCart = getCart();
                const item = currentCart.find((entry) => Number(entry.id) === gameId);

                if (!item) return;

                if (action === 'increase') item.quantity += 1;
                if (action === 'decrease') item.quantity -= 1;
                if (action === 'remove') {
                    saveCart(currentCart.filter((entry) => Number(entry.id) !== gameId));
                    renderCart();
                    return;
                }

                if (item.quantity <= 0) {
                    saveCart(currentCart.filter((entry) => Number(entry.id) !== gameId));
                } else {
                    saveCart(currentCart);
                }

                renderCart();
            });
        });
    };

    renderCart();
});
