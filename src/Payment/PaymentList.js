// PaymentList.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentList.css';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.payments) {
      setPayments(location.state.payments);
    } else {
      const fetchPayments = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/payments/getPayment'); // Ensure correct endpoint
          setPayments(response.data);
        } catch (error) {
          console.error('Error fetching payments:', error);
        }
      };
      fetchPayments();
    }
  }, [location.state]);

  return (
    <div className="payment-list-container">
      <h1>Payment List</h1>
      {payments.length > 0 ? (
        payments.map(payment => (
          <div key={payment.paymentId} className="payment-item">
            <p>Payment ID: {payment.paymentId}</p>
            <p>Payment Method: {payment.paymentMethod}</p>
            <p>Payment Date: {payment.paymentDate}</p>
            <p>Payment Status: {payment.status}</p>
            <p>Amount: {payment.amount}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default PaymentList;
