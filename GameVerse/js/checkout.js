// Checkout validation and order confirmation flow.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const summary = document.getElementById('checkout-summary');

    if (!form || !summary) return;

    const cart = getCart();
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
        if (!country) errors.push(['country', 'Please choose a country.']);
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
            successBox.textContent = `Thank you, ${fullName}! Your order has been placed successfully. A confirmation email was sent to ${email}.`;
        }

        form.reset();
        localStorage.removeItem('gameverse-cart');
        summary.innerHTML = '<div class="empty-state">Order confirmed. Your cart has been cleared.</div>';
    });
});
