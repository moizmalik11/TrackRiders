// API URL
const API_URL = 'http://localhost:5001/api';

// DOM Elements
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const alertDiv = document.getElementById('alert');

// Tab Switching
loginTab.addEventListener('click', () => {
    loginTab.classList.add('bg-gray-50');
    registerTab.classList.remove('bg-gray-50');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('bg-gray-50');
    loginTab.classList.remove('bg-gray-50');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// Show Alert Message
function showAlert(message, type = 'error') {
    alertDiv.textContent = message;
    alertDiv.classList.remove('hidden');
    alertDiv.classList.remove('bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    alertDiv.classList.add(
        type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
    );
    setTimeout(() => {
        alertDiv.classList.add('hidden');
    }, 5000);
}

// Handle Login
loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token
        localStorage.setItem('token', data.token);
        showAlert('Login successful!', 'success');
        
        // Redirect to dashboard or home page
        window.location.href = '/dashboard.html';
    } catch (error) {
        showAlert(error.message);
    }
});

// Handle Register
registerFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store token
        localStorage.setItem('token', data.token);
        showAlert('Registration successful!', 'success');
        
        // Redirect to dashboard or home page
        window.location.href = '/dashboard.html';
    } catch (error) {
        showAlert(error.message);
    }
}); 