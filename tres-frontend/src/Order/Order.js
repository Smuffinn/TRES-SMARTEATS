import { useState, useEffect } from 'react';
import { TextField} from '@mui/material';
// import {InputProps} from '@mui/material';
import './App.css';
const Order = () => {
    const [order, setOrder] = useState({
        Order_ID: '',
        Order_Date: '',
        Order_Time: '',
        Total_Amount: 0 // Placeholder value
    });

    useEffect(() => {
        // Generate Order ID, Date, and Time
        const generateOrderID = () => 'ORD-' + Math.floor(1000 + Math.random() * 9000);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        setOrder({
            Order_ID: generateOrderID(),
            Order_Date: formattedDate,
            Order_Time: formattedTime,
            Total_Amount: 150 // Example placeholder amount
        });
    }, []);

    const handleCheckout = () => {
        // Placeholder for checkout functionality
        console.log("Proceeding to checkout...");
    };

    return (
        <div className="container">
            <h1 variant="h5">ORDER DETAILS</h1>
            <TextField
                label="Order ID"
                value={order.Order_ID}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Order Date"
                value={order.Order_Date}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Order Time"
                value={order.Order_Time}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Total Amount"
                value={`₱${order.Total_Amount}`}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <button className="checkout-button" onClick={handleCheckout} variant="contained" color="primary">
                Checkout
            </button>
        </div>
    );
};

export default Order;
