const API = 'http://localhost:5000/api';

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
        window.location.href = '/dashboard.html';
    } else {
        alert(data.message || 'Login failed');
    }
});

//  Redirect to dashboard if already logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = cookieStore.get('token');
    console.log('Token:', token);
    if (token) {
        window.location.href = '/dashboard.html';
        console.log('Redirecting to dashboard...');
    }
    else {
        console.log('No token found in cookies.');
        window.location.href = '/login.html';
    }
});
