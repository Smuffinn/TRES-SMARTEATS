import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Box, TextField } from '@mui/material';

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({
    Order_ID: '',
    Customer_Name: '',
    Order_Date: new Date().toISOString().split('T')[0], // Set current date
    Order_Time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), // Set current time
    Total_Amount: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.order) {
      setOrderDetails(location.state.order);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!orderDetails.Order_ID) {
        const response = await axios.post('http://localhost:8080/api/orders/postOrder', orderDetails);
        setOrderDetails({ ...orderDetails, Order_ID: response.data.Order_ID });
      } else {
        await axios.put(`http://localhost:8080/api/orders/putOrder/${orderDetails.Order_ID}`, orderDetails);
      }
      navigate('/order/order-list');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="container">
      <h1>ORDER DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <Box spacing={2} display="flex" flexDirection="column">
          <TextField
            type="text"
            id="Order_ID"
            name="Order_ID"
            label="Order ID"
            value={orderDetails.Order_ID}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            id="Customer_Name"
            name="Customer_Name"
            label="Customer Name"
            value={orderDetails.Customer_Name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="date"
            id="Order_Date"
            name="Order_Date"
            label="Order Date"
            value={orderDetails.Order_Date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="time"
            id="Order_Time"
            name="Order_Time"
            label="Order Time"
            value={orderDetails.Order_Time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="number"
            id="Total_Amount"
            name="Total_Amount"
            label="Total Amount"
            value={orderDetails.Total_Amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        </Box>
        <button type="submit">
          {orderDetails.Order_ID ? 'Update Order' : 'Add Order'}
        </button>
        <button type="button" onClick={() => navigate('/order/order-list')}>
          Order List
        </button>
      </form>
    </div>
  );
};

export default Order;
