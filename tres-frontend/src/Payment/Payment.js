import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Payment = ({ paymentData, setPaymentData }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    Payment_ID: '',
    Payment_Method: '',
    Payment_Date: '',
    Payment_Status: '',
    Amount: ''
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    console.log('Creating payment with details:', paymentDetails); // Log payment details
    try {
      const response = await fetch('http://localhost:8080/api/payments/postPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentId: paymentDetails.Payment_ID,
          amount: paymentDetails.Amount,
          paymentDate: paymentDetails.Payment_Date,
          paymentMethod: paymentDetails.Payment_Method,
          status: paymentDetails.Payment_Status
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Payment created successfully:', data);
      alert('Payment created successfully!');
      setPaymentData((prevData) => [...prevData, data]);
      navigate('/payment-list');
    } catch (error) {
      console.error('Error creating payment:', error.message); // Log full error message
      alert('Error creating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewPayment = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/payments/getPayment');
      setPaymentData(response.data);
      //navigate('/payment-list'); 
    } catch (error) {
      console.error('Failed to load payment data:', error.response ? error.response.data : error.message);
      alert('Failed to load payment data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    const paymentId = paymentDetails.Payment_ID;
    setLoading(true);
    console.log('Updating payment with details:', paymentDetails); // Log payment details
    try {
      const response = await fetch(`http://localhost:8080/api/payments/putPayment/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentId: paymentDetails.Payment_ID,
          amount: paymentDetails.Amount,
          paymentDate: paymentDetails.Payment_Date,
          paymentMethod: paymentDetails.Payment_Method,
          status: paymentDetails.Payment_Status
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Payment updated successfully:', data);
      alert('Payment updated successfully!');
      setPaymentData((prevData) => prevData.map(payment => payment.paymentId === paymentId ? data : payment));
      navigate('/payment-list');
    } catch (error) {
      console.error('Error updating payment:', error.message); // Log full error message
      alert('Error updating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async () => {
    const paymentId = paymentDetails.Payment_ID;
    setLoading(true);
    console.log('Deleting payment with ID:', paymentId); // Log payment ID
    try {
      const response = await fetch(`http://localhost:8080/api/payments/deletePayment/${paymentId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Payment deleted successfully');
      alert('Payment deleted successfully!');
      setPaymentDetails({
        Payment_ID: '',
        Payment_Method: '',
        Payment_Date: '',
        Payment_Status: '',
        Amount: ''
      });
      setPaymentData((prevData) => prevData.filter(payment => payment.paymentId !== paymentId));
    } catch (error) {
      console.error('Error deleting payment:', error.message); // Log full error message
      alert('Error deleting payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>PAYMENT</h1>
      <form onSubmit={handleCreatePayment}>
        <input
          type="text"
          id="Payment_ID"
          name="Payment_ID"
          placeholder="Payment ID"
          value={paymentDetails.Payment_ID}
          onChange={handleChange}
        />
        <select
          id="Payment_Method"
          name="Payment_Method"
          value={paymentDetails.Payment_Method}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Payment Method</option>
          <option value="GCASH">GCASH</option>
          <option value="Paypal">Paypal</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <input
          type="date"
          id="Payment_Date"
          name="Payment_Date"
          value={paymentDetails.Payment_Date}
          onChange={handleChange}
          required
        />
        <select
          id="Payment_Status"
          name="Payment_Status"
          value={paymentDetails.Payment_Status}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
        <input
          type="text"
          id="Amount"
          name="Amount"
          placeholder="Amount"
          value={paymentDetails.Amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Payment</button>
        <button type="button" onClick={handleViewPayment}>View Payment Details</button>
        <button type="button" onClick={handleUpdatePayment}>Update Payment</button>
        <button type="button" onClick={handleDeletePayment}>Delete Payment</button>
      </form>

      {loading && <p>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
            <th>Payment Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.status}</td>
              <td>{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;