import React, { useState } from 'react';
import './Customer.css';

const PaymentOptions = ({ totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-options">
        <button onClick={() => handlePaymentMethodChange('Card')} className="payment-option">Card</button>
        <button onClick={() => handlePaymentMethodChange('QR Code')} className="payment-option">QR Code</button>
        <button onClick={() => handlePaymentMethodChange('Cash')} className="payment-option">Cash</button>
      </div>
      {paymentMethod && (
        <div className="payment-summary">
          <h3>Payment Method: {paymentMethod}</h3>
          <h4>Total: ${totalAmount}</h4>
          <button className="pay-button">Proceed with Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
