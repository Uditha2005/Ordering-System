const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true,
    enum: ['Regular Potato', 'Sweet Potato', 'Loaded Potato', 'Spicy Potato']
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  toppings: [{
    type: String,
    enum: ['cheese', 'tomatoes', 'chilies', 'bacon', 'sour-cream', 'green-onions']
  }],
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema); 