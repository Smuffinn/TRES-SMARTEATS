import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Box, TextField } from '@mui/material';

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    customerName: '',
    orderDate: new Date().toISOString().split('T')[0], // Set current date
    orderTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), // Set current time
    totalAmount: ''
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
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const formattedOrderDetails = {
        ...orderDetails,
        orderDate: new Date(orderDetails.orderDate).toISOString(),
        orderTime: orderDetails.orderTime + ":00" // Ensure time is in HH:mm:ss format
      };
      if (!orderDetails.orderId) {
        const response = await axios.post('http://localhost:8080/api/orders/postOrder', formattedOrderDetails, config);
        setOrderDetails({ ...orderDetails, orderId: response.data.orderId });
      } else {
        await axios.put(`http://localhost:8080/api/orders/putOrder/${orderDetails.orderId}`, formattedOrderDetails, config);
      }
      navigate('/Payment/Payment'); // Ensure navigation happens after successful submission
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
            id="orderId"
            name="orderId"
            label="Order ID"
            value={orderDetails.orderId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="text"
            id="customerName"
            name="customerName"
            label="Customer Name"
            value={orderDetails.customerName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="date"
            id="orderDate"
            name="orderDate"
            label="Order Date"
            value={orderDetails.orderDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="time"
            id="orderTime"
            name="orderTime"
            label="Order Time"
            value={orderDetails.orderTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            type="number"
            id="totalAmount"
            name="totalAmount"
            label="Total Amount"
            value={orderDetails.totalAmount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        </Box>
        <button type="submit">
          {orderDetails.orderId ? 'Update Order' : 'Add Order'}
        </button>
        <button type="button" onClick={() => navigate('/Order/order-list')}>
          Order List
        </button>
      </form>
    </div>
  );
};

export default Order;
