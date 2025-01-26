// public/admin-dashboard.js

async function getDashboardData() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/index.html';  // Redirect to login if not authenticated
    return;
  }

  const response = await fetch('http://localhost:3000/admin/dashboard', {
    method: 'GET',
    headers: { 'Authorization': token },
  });

  if (response.ok) {
    const data = await response.text();
    document.getElementById('dashboard-content').innerHTML = data;
  } else {
    document.getElementById('dashboard-content').innerHTML = 'Access Denied!';
  }
}

getDashboardData();
