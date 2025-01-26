const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let orders = []; // Store orders temporarily (in memory)

// Endpoint to receive order data from front-end
app.post('/api/order', (req, res) => {
  const order = req.body.items;
  if (order && order.length > 0) {
    orders.push(order); // Save the order in the orders array
    console.log('New order received:', order);
    res.status(200).json({ message: 'Order received!' });
  } else {
    res.status(400).json({ message: 'Invalid order data' });
  }
});

// Endpoint for admin to view all orders
app.get('/api/orders', (req, res) => {
  res.status(200).json(orders);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
