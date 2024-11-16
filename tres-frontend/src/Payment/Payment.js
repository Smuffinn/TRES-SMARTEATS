import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    Payment_ID: '',
    Payment_Method: '',
    Payment_Date: '',
    Payment_Status: '',
    Amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState([]); // Updated to store list of payments
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      Payment_Date: today
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/insertPayment', paymentDetails);
      console.log('Payment created successfully:', response.data);
      alert('Payment created successfully!');
      navigate('/payment');
    } catch (error) {
      console.error('Error creating payment:', error.response ? error.response.data : error.message);
      alert('Error creating payment. Please try again.');
    }
  };
  

  const handleViewPayment = async () => {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:8080/getPayment');
        setPaymentData(response.data);
        navigate('/payment-list'); // Navigate to PaymentList view after fetching data
    } catch (error) {
        console.error('Failed to load payment data:', error.response ? error.response.data : error.message);
    } finally {
        setLoading(false);
    }
};

  

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    const paymentId = paymentDetails.Payment_ID;
    try {
      const response = await axios.put(`http://localhost:8080/updatePayment/${paymentId}`, paymentDetails); // Updated endpoint
      console.log('Payment updated successfully:', response.data);
      alert('Payment updated successfully!');
      navigate('/payment-list');
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error updating payment. Please try again.');
    }
  };

  const handleDeletePayment = async () => {
    const paymentId = paymentDetails.Payment_ID;
    try {
      await axios.delete(`http://localhost:8080/deletePayment/${paymentId}`); // Updated endpoint
      alert('Payment deleted successfully!');
      setPaymentDetails({
        Payment_ID: '',
        Payment_Method: '',
        Payment_Date: '',
        Payment_Status: '',
        Amount: ''
      });
      setPaymentData(paymentData.filter(payment => payment.Payment_ID !== paymentId)); // Update paymentData state
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Error deleting payment. Please try again.');
    }
  };
  

  return (
    <div className="container">
      <h1>PAYMENT</h1>
      <form onSubmit={handleCreatePayment}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <TextField
        label="Payment ID"
        id="Payment_ID"
        name="Payment_ID"
        value={paymentDetails.Payment_ID}
        onChange={handleChange}
        fullWidth
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="Payment_Method_Label">Payment Method</InputLabel>
        <Select
          label="Payment Method"
          value={paymentDetails.Payment_Method}
          onChange={handleChange}
          required
          MenuProps={{
            PaperProps: {
                sx: {
                    textAlign: 'left', // Ensure options are left-aligned
                },
            },
        }}
        sx={{ textAlign: 'left' }}
        >
          <MenuItem value="" disabled>Select Payment Method</MenuItem>
          <MenuItem value="GCASH">GCASH</MenuItem>
          <MenuItem value="Paypal">Paypal</MenuItem>
          <MenuItem value="Credit Card">Credit Card</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Payment Date"
        type="date"
        id="Payment_Date"
        name="Payment_Date"
        value={paymentDetails.Payment_Date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel id="Payment_Status_Label">Payment Status</InputLabel>
        <Select
          label="PaymentStatus"
          id="Payment_Status"

          value={paymentDetails.Payment_Status}
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
        label="Amount"
        id="Amount"
        name="Amount"
        placeholder="Amount"
        value={paymentDetails.Amount}
        onChange={handleChange}
        fullWidth
        required
      />
    </Box>
        <button type="submit">Create Payment</button>
        <button type="button" onClick={handleViewPayment}>View Payment Details</button>
        <button type="button" onClick={handleUpdatePayment}>Update Payment</button>
        <button type="button" onClick={handleDeletePayment}>Delete Payment</button>
      </form>

      {loading && <p>Loading...</p>}

      {paymentData.length > 0 && (
        <div className="payment-details">
          <h2>Payment Details</h2>
          {paymentData.map(payment => (
            <div key={payment.Payment_ID}>
              <p>Payment ID: {payment.Payment_ID}</p>
              <p>Payment Method: {payment.Payment_Method}</p>
              <p>Payment Date: {payment.Payment_Date}</p>
              <p>Payment Status: {payment.Payment_Status}</p>
              <p>Amount: {payment.Amount}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payment;
