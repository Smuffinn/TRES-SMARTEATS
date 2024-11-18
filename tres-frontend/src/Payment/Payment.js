import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId: '',
    paymentMethod: '',
    paymentDate: '',
    status: '',
    amount: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.payment) {
      setPaymentDetails(location.state.payment);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (paymentDetails.paymentId) {
        await axios.put(`http://localhost:8080/api/payments/putPayment/${paymentDetails.paymentId}`, paymentDetails);
      } else {
        await axios.post('http://localhost:8080/api/payments/postPayment', paymentDetails);
      }
      navigate('/payment-list');
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  return (
    <div className="container">
      <h1>PAYMENT</h1>
      <form onSubmit={handleSubmit}>
        <Box spacing={2} display="flex" flexDirection="column">
          <TextField
            type="text"
            id="paymentId"
            name="paymentId"
            placeholder="Payment ID"
            value={paymentDetails.paymentId}
            onChange={handleChange}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Select Payment Method</InputLabel>
            <Select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentDetails.paymentMethod}
              onChange={handleChange}
              required
            >
              <MenuItem value="" disabled>Select Payment Method</MenuItem>
              <MenuItem value="GCASH">GCASH</MenuItem>
              <MenuItem value="Paypal">Paypal</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            id="paymentDate"
            name="paymentDate"
            value={paymentDetails.paymentDate}
            onChange={handleChange}
            required
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Select Payment Status</InputLabel>
            <Select
              id="status"
              name="status"
              value={paymentDetails.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="" disabled>Select Payment Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Refunded">Refunded</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            required
          />
        </Box>
        <button type="submit">
          {paymentDetails.paymentId ? 'Update Payment' : 'Add Payment'}
        </button>
        <button type="button" onClick={() => navigate('/Payment/payment-list')}>
          Payment List
        </button>
      </form>
    </div>
  );
};

export default Payment;