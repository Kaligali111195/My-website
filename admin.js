// admin.js
document.getElementById('admin-login-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      // Send login data to the back-end
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);  // Save JWT token in local storage
        alert('Login successful');
        window.location.href = '/admin-dashboard.html';  // Redirect to the admin dashboard
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  });
  