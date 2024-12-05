import React from "react";
import "./OrderSum.css";
import { Box, Button } from "@mui/material";

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <header className="header">
        <img src="/logo.png" alt="SmartEats Logo" className="logo" />
        <nav className="nav">
          <a href="#about-us">About us</a>
        </nav>
      </header>

      <div className="content">
        <h1 className="order-number">
          Order number: <span>07</span>
        </h1>
        <p className="order-details">
          Order Date: 19/11/2024 <br />
          Order Time: 01:02 pm
        </p>
        <h2 className="success-message">Order Placed Successfully!</h2>
        <p className="instructions">
          Please proceed to the counter to make your payment.
        </p>

        <Box className="order-summary-box">
          <h3>TAKEOUT</h3>
          <div className="items">
            <p>Double Quarter Pounder® with Cheese</p>
            <p>2 × ₱0.00</p>
          </div>
          <div className="items">
            <p>Double Quarter Pounder® with Cheese</p>
            <p>1 × ₱0.00</p>
          </div>
          <div className="total">
            <p>Total:</p>
            <p>₱100.00</p>
          </div>
        </Box>

        <p className="enjoy">Enjoy your meal!</p>

        <Button className="start-over-btn" variant="contained" color="secondary" href="/start-over">
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
