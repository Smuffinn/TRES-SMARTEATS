import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Paper, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './ConfirmationPage.css';
import './App.css';
import logo1 from '../white_background.png';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetails, paymentDetails } = location.state || {};

  // Enhanced debugging
  console.log('Full Location State:', location.state);
  console.log('Order Details Object:', orderDetails);
  console.log('Order ID Value:', orderDetails?.orderId);

  const handleBackToMenu = () => {
    navigate('/MenuItem/view-menu');
  };

  return (
    <div className="confirmation-container" style={{ backgroundColor: '#800000', minHeight: '100vh' }}>
      <Paper elevation={0} className="confirmation-content" sx={{ backgroundColor: 'white' }}>
        {/* <img src={logo1} alt="CITU - SMART EATS Logo" className="confirmation-logo" /> */}
        <div className="confirmation-message">
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontSize: '2.2rem',  // increased from 2rem
              fontWeight: 600,
              letterSpacing: '0.5px',
              mb: 2  // reduced from 4
            }}
          >
            Order Confirmed!
          </Typography>
          <Box className="checkmark">
            <CheckCircleOutlineIcon sx={{ fontSize: 50 }} /> 
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,  // reduced from 4
              fontSize: '1.1rem',  // reduced from 1.3rem
              letterSpacing: '0.2px',
              fontWeight: 500 
            }}
          >
            Thank you for your order, {orderDetails?.customerName}!
          </Typography>
          
          <Paper elevation={0} className="order-details">
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                fontSize: '1.4rem',  // reduced from 1.6rem
                fontWeight: 500,
                mb: 3  // reduced from 3
              }}
            >
              Order Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ fontSize: '1.3rem' }}>
                Order ID: 
                <br />
                <span style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '1.4rem' }}>
                  {orderDetails?.orderId ? 
                    `#${orderDetails.orderId}` : 
                    console.log('No order ID found in:', orderDetails) || 'Processing...'}
                </span>
              </Typography>
              <Typography sx={{ fontSize: '1.3rem' }}>
                Order Date: 
                <br />
                {orderDetails?.orderDate}
              </Typography>
              <Typography sx={{ fontSize: '1.3rem' }}>
                Order Time: 
                <br />
                {orderDetails?.orderTime}
                
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem', mt: 3 }}>
              Total Amount: <br />₱ {orderDetails?.totalAmount}
              
            </Typography>
          </Paper>

          <Paper elevation={0} className="payment-details">
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                fontSize: '1.4rem',
                fontWeight: 500,
                mb: 3
              }}
            >
              Payment Information
            </Typography>
            <Typography sx={{ mb: 2, fontSize: '1.3rem' }}>
              Payment Method: <br />{paymentDetails?.paymentMethod}
              <br/>
            </Typography>
            <br />
            <Typography sx={{ fontSize: '1.1rem' }}>
              Payment Status: <br />{paymentDetails?.status}
            </Typography>
          </Paper>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBackToMenu}
            className="back-button"
            sx={{ 
              bgcolor: '#2e7d32',
              '&:hover': { bgcolor: '#1b5e20' },
              mb: 2  // Add margin bottom
            }}
          >
            Back to Menu
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => navigate('/Feedback/feedback')}
            sx={{ 
              borderColor: '#2e7d32',
              color: '#2e7d32',
              '&:hover': { 
                bgcolor: 'rgba(46, 125, 50, 0.04)',
                borderColor: '#1b5e20'
              }
            }}
          >
            Share Your Feedback
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ConfirmationPage;