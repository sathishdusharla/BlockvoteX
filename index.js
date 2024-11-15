// Get the button elements
const adminBtn = document.getElementById('admin-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Add click event listeners to each button
adminBtn.addEventListener('click', () => {
    window.location.href = '/Admin/admin_login.html';
});

loginBtn.addEventListener('click', () => {
    window.location.href = '/Voter/voter_login.html';
});

registerBtn.addEventListener('click', () => {
    window.location.href = '/Voter/voter_registration.html';
});
