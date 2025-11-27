import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { createOrder, getOrders } from '../services/api';

const Home = () => {
  const [formData, setFormData] = useState({
    username: '',
    itemName: 'Regular Potato',
    amount: 1,
    toppings: [],
  });

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const toppingOptions = [
    'cheese',
    'tomatoes',
    'chilies',
    'bacon',
    'sour-cream',
    'green-onions',
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error fetching orders',
        severity: 'error',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToppingChange = (topping) => {
    setFormData((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(formData);
      setFormData({
        username: '',
        itemName: 'Regular Potato',
        amount: 1,
        toppings: [],
      });
      setSnackbar({
        open: true,
        message: 'Order created successfully!',
        severity: 'success',
      });
      fetchOrders();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error creating order',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const filteredOrders = orders.filter((order) =>
    order.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Item</InputLabel>
                <Select
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  label="Select Item"
                >
                  <MenuItem value="Regular Potato">Regular Potato</MenuItem>
                  <MenuItem value="Sweet Potato">Sweet Potato</MenuItem>
                  <MenuItem value="Loaded Potato">Loaded Potato</MenuItem>
                  <MenuItem value="Spicy Potato">Spicy Potato</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                margin="normal"
                inputProps={{ min: 1 }}
                required
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Select Toppings
              </Typography>
              <FormGroup>
                {toppingOptions.map((topping) => (
                  <FormControlLabel
                    key={topping}
                    control={
                      <Checkbox
                        checked={formData.toppings.includes(topping)}
                        onChange={() => handleToppingChange(topping)}
                      />
                    }
                    label={topping}
                  />
                ))}
              </FormGroup>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Confirm Order
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Purchase History
            </Typography>
            <TextField
              fullWidth
              label="Search by Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              margin="normal"
            />
            <Box sx={{ mt: 2 }}>
              {filteredOrders.map((order) => (
                <Paper
                  key={order._id}
                  sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}
                >
                  <Typography variant="subtitle1">
                    {order.username} - {order.itemName}
                  </Typography>
                  <Typography variant="body2">
                    Amount: {order.amount}
                  </Typography>
                  <Typography variant="body2">
                    Toppings: {order.toppings.join(', ')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ordered: {new Date(order.orderDate).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home; 