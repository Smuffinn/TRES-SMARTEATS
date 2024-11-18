import React, { useState } from 'react';
import './Customer.css';

const OrderConfirmation = () => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [prepTime, setPrepTime] = useState(null);

  const confirmOrder = () => {
    const orderNum = Math.floor(Math.random() * 1000);
    const time = Math.floor(Math.random() * 30) + 15; // Estimated time between 15 to 45 minutes
    setOrderNumber(orderNum);
    setPrepTime(time);
    setOrderConfirmed(true);
  };

  return (
    <div className="confirmation-container">
      <h2>Order Confirmation</h2>
      {!orderConfirmed ? (
        <button onClick={confirmOrder} className="confirm-button">Confirm Order</button>
      ) : (
        <div className="order-details">
          <p>Order Number: #{orderNumber}</p>
          <p>Estimated Preparation Time: {prepTime} minutes</p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
