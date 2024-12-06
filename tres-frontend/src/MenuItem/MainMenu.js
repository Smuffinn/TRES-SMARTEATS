import React, { useEffect, useState } from 'react';
import './MainMenu.css';
import './MenuItem.css';
import './App.css';
import logo1 from '../white_background.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IconButton, TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';

const MainMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [orderDetails, setOrderDetails] = useState({
    orderId: '', 
    customerName: '', 
    orderDate: new Date().toISOString().split('T')[0], 
    orderTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    totalAmount: 0,
  });
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId: '', 
    paymentMethod: '', 
    paymentDate: new Date().toISOString().split('T')[0],
    status: 'Pending', // Default payment status
    amount: 0
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, [category]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
      if (category === 'All') {
        setMenuItems(response.data);
      } else {
        setMenuItems(response.data.filter(item => item.category === category));
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const toggleSelectMenuItem = (item) => {
    const itemIndex = selectedItems.findIndex(i => i.menu_id === item.menu_id);
    if (itemIndex !== -1) {
      setSelectedItems(selectedItems.filter((_, index) => index !== itemIndex));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
      
    }
  };

  

  const changeQuantity = (itemId, increment) => {
    setSelectedItems(prevItems => prevItems.map(item => {
      if (item.menu_id === itemId) {
        const updatedQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        if (updatedQuantity > 0) {
          return { ...item, quantity: updatedQuantity };
        }
      }
      return item;
    }));
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    const newErrors = {};
    if (!orderDetails.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!paymentDetails.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const newOrder = {
      ...orderDetails,
      totalAmount: totalAmount,
    };
    const newPayment = {
      ...paymentDetails,
      amount: totalAmount,
    };

    try {
      // First, post the order and get the response
      const orderResponse = await axios.post('http://localhost:8080/api/orders/postOrder', newOrder);
      
      // Log the entire response to see its structure
      console.log('Full Order Response:', orderResponse);
      
      // Assuming the order ID is in the response data
      // Update this line based on your actual API response structure
      const orderId = orderResponse.data.id || orderResponse.data.orderId || orderResponse.data;
      
      console.log('Extracted Order ID:', orderId);

      // Create the final order details with the order ID
      const finalOrderDetails = {
        ...orderDetails,
        orderId: orderId,
        customerName: orderDetails.customerName,
        orderDate: orderDetails.orderDate,
        orderTime: orderDetails.orderTime,
        totalAmount: totalAmount
      };

      console.log('Final Order Details:', finalOrderDetails);

      // Post payment details
      await axios.post('http://localhost:8080/api/payments/postPayment', newPayment);

      // Navigate with complete order details
      navigate('/confirmation', { 
        state: { 
          orderDetails: finalOrderDetails,
          paymentDetails: newPayment
        }
      });
    } catch (error) {
      console.error('Error in order submission:', error);
      console.error('Error response:', error.response);
    }
  };

  const startOver = () => {
    setSelectedItems([]);
    setOrderDetails({
      orderId: '',
      customerName: '',
      orderDate: new Date().toISOString().split('T')[0],
      orderTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      totalAmount: 0
    });
    setPaymentDetails({
      paymentId: '',
      paymentMethod: '',
      paymentDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      amount: 0
    });
  };

  return (
    <div className="contain">
      <div className="main">
        <Link to="/" className="logo-container">
          <img src={logo1} alt="CITU - SMART EATS Logo" className="logo" />
        </Link>
        <div className="content-wrapper">
        
        <div className='nav-sidebar'>
          <button onClick={() => handleCategoryChange('All')}>
            <div className='button-content'>
              <img src='/navsidebarpics/all.png' alt='All' className='category-icon' />
              <span className='category-text'>All</span>
            </div>
          </button>
          <button onClick={() => handleCategoryChange('Drinks')}>
            <div className='button-content'>
              <img src='/navsidebarpics/drinks.png' alt='Drinks' className='category-icon' />
              <span className='category-text'>Drinks</span>
            </div>
          </button>
          <button onClick={() => handleCategoryChange('Meals')}>
            <div className='button-content'>
              <img src='/navsidebarpics/meals.png' alt='Meals' className='category-icon' />
              <span className='category-text'>Meals</span>
            </div>
          </button>
          <button onClick={() => handleCategoryChange('Snacks')}>
            <div className='button-content'>
              <img src='/navsidebarpics/snakcs.png' alt='Snacks' className='category-icon' />
              <span className='category-text'>Snacks</span>
            </div>
          </button>
          <button onClick={() => handleCategoryChange('Desserts')}>
            <div className='button-content'>
              <img src='/navsidebarpics/desserts.png' alt='Desserts' className='category-icon' />
              <span className='category-text'>Desserts</span>
            </div>
          </button>
        </div>


          <div className="menu-container">
            <div className="menu-cards">
              {menuItems.map(item => (
                <div 
                  className={`menu-card ${selectedItems.some(i => i.menu_id === item.menu_id) ? 'selected' : ''}`} 
                  key={item.menu_id} 
                  onClick={() => toggleSelectMenuItem(item)} 
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={item.image_url} 
                    alt={item.item_name} 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                  <h3>{item.item_name}</h3>
                  <p>Price: ₱{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedItems.length >= 0 && (
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="selected-items-container">
                {selectedItems.length === 0 ? (
                  <p className="no-items">No items selected</p>
                ) : (
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map(item => (
                        <tr key={item.menu_id}>
                          <td>{item.item_name}</td>
                          <td>₱{item.price.toFixed(2)}</td>
                          <td className="quantity-cell">
                            <button 
                              className="quantity-btn"
                              onClick={() => changeQuantity(item.menu_id, false)}
                            >
                              −
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => changeQuantity(item.menu_id, true)}
                            >
                              +
                            </button>
                          </td>
                          <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td colSpan="3">Total Amount:</td>
                        <td>₱{selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

              <div className="order-details-grid">
                <TextField
                  label="Customer Name"
                  name="customerName"
                  value={orderDetails.customerName}
                  onChange={handleOrderChange}
                  required
                  error={!!errors.customerName}
                  helperText={errors.customerName}
                  fullWidth
                  className="order-input"
                />

                <FormControl fullWidth error={!!errors.paymentMethod} className="order-input">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    name="paymentMethod"
                    value={paymentDetails.paymentMethod}
                    onChange={handlePaymentChange}
                    required
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="GCASH">GCASH</MenuItem>
                    <MenuItem value="Paypal">Paypal</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                  </Select>
                  {errors.paymentMethod && (
                    <div className="error-message">{errors.paymentMethod}</div>
                  )}
                </FormControl>
              </div>

              <div className="order-actions">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmit}
                  disabled={selectedItems.length === 0}
                >
                  Place Order
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={startOver}
                >
                  Clear Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
