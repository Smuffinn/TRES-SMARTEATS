import React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import './OrderSum.css';

// OrderSummary Component
const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Assuming the order details are passed via location state (after payment)
  const { orderNumber, orderDate, orderTime, orderDetails, totalAmount } = location.state || {};

  const handleStartOver = () => {
    navigate("/"); // Navigate back to home or the start of the process
  };

  return (
    <div className="order-summary">
      {/* <Box sx={{ padding: 3, backgroundColor: "maroon", color: "white" }}>
        <img src="/logo.png" alt="SmartEats Logo" className="logo" />
      </Box> */}

      <Box sx={{ backgroundColor: "#FFD700", padding: 3, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4">Order number: {orderNumber || "N/A"}</Typography>
        <Typography variant="h6">Order Date: {orderDate || "N/A"}</Typography>
        <Typography variant="h6">Order Time: {orderTime || "N/A"}</Typography>
        
        <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold", color: "green" }}>
          Order Placed Successfully!
        </Typography>
        
        <Typography sx={{ marginTop: 1 }}>Please proceed to the counter to make your payment.</Typography>
        
        <Paper sx={{ marginTop: 2, padding: 2, textAlign: "left" }}>
          <Typography variant="h6">TAKEOUT</Typography>
          {orderDetails?.map((item, index) => (
            <div key={index} className="order-item">
              <Typography>{item.name}</Typography>
              <Typography>{item.quantity} × ₱{item.price}</Typography>
            </div>
          ))}
          <div className="total">
            <Typography variant="h6">Total: ₱{totalAmount || "0.00"}</Typography>
          </div>
        </Paper>

        <Typography color="#800000" sx={{ marginTop: 3 }} variant="h6">Enjoy your meal!</Typography>

        <Button className="order-footer"
          variant="contained" 
          color="#333333" 
          onClick={handleStartOver} 
          sx={{
            marginTop: 3,
            backgroundColor: '#333333',  // Default background color of the button
            color: 'white', // Text color for visibility on the dark button
            '&:hover': {
              backgroundColor: '#80000',  // Change background on hover for a slight effect
            },
          }}
        >
          Start Over
        </Button>

      </Box>
    </div>
  );
};

export default OrderSummary;
