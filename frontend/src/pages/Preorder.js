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
import { createPreorder, getPreorders } from '../services/api';

const Preorder = () => {
  const [formData, setFormData] = useState({
    username: '',
    itemName: 'Regular Potato',
    amount: 1,
    toppings: [],
    pickupDate: '',
  });

  const [preorders, setPreorders] = useState([]);
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
    fetchPreorders();
  }, []);

  const fetchPreorders = async () => {
    try {
      const data = await getPreorders();
      setPreorders(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error fetching preorders',
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
      await createPreorder(formData);
      setFormData({
        username: '',
        itemName: 'Regular Potato',
        amount: 1,
        toppings: [],
        pickupDate: '',
      });
      setSnackbar({
        open: true,
        message: 'Preorder created successfully!',
        severity: 'success',
      });
      fetchPreorders();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error creating preorder',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const filteredPreorders = preorders.filter((preorder) =>
    preorder.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Preorder Form
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
              <TextField
                fullWidth
                type="date"
                label="Pickup Date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
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
                Confirm Preorder
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Preorder History
            </Typography>
            <TextField
              fullWidth
              label="Search by Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              margin="normal"
            />
            <Box sx={{ mt: 2 }}>
              {filteredPreorders.map((preorder) => (
                <Paper
                  key={preorder._id}
                  sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}
                >
                  <Typography variant="subtitle1">
                    {preorder.username} - {preorder.itemName}
                  </Typography>
                  <Typography variant="body2">
                    Amount: {preorder.amount}
                  </Typography>
                  <Typography variant="body2">
                    Toppings: {preorder.toppings.join(', ')}
                  </Typography>
                  <Typography variant="body2">
                    Pickup Date: {new Date(preorder.pickupDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Preordered: {new Date(preorder.preorderDate).toLocaleString()}
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

export default Preorder; 