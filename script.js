// Function to add item to cart
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get cart from localStorage or create empty array
  cart.push({ name, price });  // Add item to the cart
  localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart back to localStorage
  alert(`${name} added to cart!`);
  updateCart();  // Update the cart page if it's already loaded
}

// Function to update the cart display on the Cart Page (cart.html)
function updateCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';  // Clear previous items

  let totalPrice = 0;
  cart.forEach((item, index) => {
    totalPrice += item.price;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - $${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  // Update the total price
  document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);  // Remove item at the specified index
  localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart back to localStorage
  updateCart();  // Re-update the cart after removing an item
}

// Function to checkout and send the order to the server
function checkout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Send order data to the server
  fetch('http://localhost:3000/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: cart }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Order received:', data);
    localStorage.removeItem('cart'); // Clear the cart after checkout
    window.location.href = 'order-confirmation.html'; // Redirect to confirmation page
  })
  .catch(error => {
    console.error('Error sending order:', error);
  });
}
