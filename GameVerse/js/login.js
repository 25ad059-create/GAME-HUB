// Demo login logic for the GameVerse storefront.
// This is intentionally a front-end-only demo and does not authenticate a real user.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const loginInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const toggleButton = document.getElementById('toggle-password');
    const successBox = document.getElementById('login-success');

    if (!form || !loginInput || !passwordInput || !toggleButton || !successBox) return;

    toggleButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleButton.textContent = isPassword ? 'Hide' : 'Show';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = loginInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        document.querySelectorAll('.form-error').forEach((error) => {
            error.textContent = '';
        });

        let hasError = false;

        if (!emailValue) {
            document.querySelector('[data-error="loginEmail"]').textContent = 'Please enter your email or username.';
            hasError = true;
        }

        if (passwordValue.length < 6) {
            document.querySelector('[data-error="loginPassword"]').textContent = 'Password must be at least 6 characters long.';
            hasError = true;
        }

        if (hasError) {
            successBox.classList.remove('visible');
            return;
        }

        const username = emailValue.includes('@') ? emailValue.split('@')[0] : emailValue;
        successBox.textContent = `Welcome back, ${username}! Demo login successful. Redirecting to the homepage...`;
        successBox.classList.add('visible');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1400);
    });
});
