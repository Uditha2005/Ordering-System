import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Order APIs
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrdersByUsername = async (username) => {
  try {
    const response = await api.get(`/orders/user/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders by username:', error);
    throw error;
  }
};

// Preorder APIs
export const createPreorder = async (preorderData) => {
  try {
    const response = await api.post('/preorders', preorderData);
    return response.data;
  } catch (error) {
    console.error('Error creating preorder:', error);
    throw error;
  }
};

export const getPreorders = async () => {
  try {
    const response = await api.get('/preorders');
    return response.data;
  } catch (error) {
    console.error('Error fetching preorders:', error);
    throw error;
  }
};

export const getPreordersByUsername = async (username) => {
  try {
    const response = await api.get(`/preorders/user/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching preorders by username:', error);
    throw error;
  }
}; 