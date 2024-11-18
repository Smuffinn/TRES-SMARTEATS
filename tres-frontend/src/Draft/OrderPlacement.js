import React, { useState } from 'react';
import './Customer.css';

const OrderPlacement = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (name, price) => {
    setCart([...cart, { name, price }]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="order-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button onClick={() => removeFromCart(index)} className="remove-item">Remove</button>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default OrderPlacement;
