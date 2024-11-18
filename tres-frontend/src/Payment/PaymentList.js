import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentList.css';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payments/getPayment');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const editPayment = (payment) => {
    navigate('/Payment/payment', { state: { payment } });
  };

  const deletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/payments/deletePayment/${paymentId}`);
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div className="payment-list-container">
      <h1>Payment List</h1>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
            <th>Payment Status</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.status}</td>
              <td>{payment.amount}</td>
              <td>
                <button onClick={() => editPayment(payment)}>Edit</button>
                <button onClick={() => deletePayment(payment.paymentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
