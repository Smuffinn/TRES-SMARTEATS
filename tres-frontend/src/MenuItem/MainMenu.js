import React, { useEffect, useState } from 'react';
import './MainMenu.css';
import logo1 from '../white_background.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const MainMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [category, setCategory] = useState('All'); // State to track selected category
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, [category]); // Fetch menu items when category changes

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
      if (category === 'All') {
        setMenuItems(response.data);
      } else {
        setMenuItems(response.data.filter(item => item.category === category)); // Filter by category
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const deleteMenuItem = async (menu_id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await axios.delete(`http://localhost:8080/tes/menu/deleteMenuitem/${menu_id}`);
        alert("Menu item deleted successfully.");
        fetchMenuItems(); // Refresh the menu list after deletion
      } catch (error) {
        console.error('Error deleting menu item:', error);
        alert("Failed to delete menu item. Please try again.");
      }
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

  const viewSelectedItemsDetails = () => {
    // Navigate to the MenuItemDetails page and pass the selected items
    const selectedItemsDetails = menuItems.filter(item => selectedItems.some(selected => selected.menu_id === item.menu_id));
    navigate('/MenuItem/MenuItemDetails', { state: { items: selectedItemsDetails } });
  };

  const startOver = () => {
    setSelectedItems([]);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const generatePlaceholders = (items, perRow) => {
    const placeholdersNeeded = perRow - (items.length % perRow || perRow);
    return Array.from({ length: placeholdersNeeded }, (_, index) => (
      <div className="menu-card placeholder" key={`placeholder-${index}`} />
    ));
  };

  return (
    <div className="contain">
      <div className="main">
        <Link to="/" className="logo-container">
          <img src={logo1} alt="CITU - SMART EATS Logo" className="logo" />
        </Link>
        <div className="content-wrapper">
          <div className='nav-sidebar'>
            <button onClick={() => handleCategoryChange('All')}>All</button>
            <button onClick={() => handleCategoryChange('Drinks')}>Drinks</button>
            <button onClick={() => handleCategoryChange('Meals')}>Meals</button>
            <button onClick={() => handleCategoryChange('Snacks')}>Snacks</button>
            <button onClick={() => handleCategoryChange('Desserts')}>Desserts</button>
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
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {item.quantity === 0 ? 'Not Available' : item.status}</p>
                </div>
              ))}
              {generatePlaceholders(menuItems, 3)} {/* Ensures the grid remains steady */}
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div className="order-summary">
              <h2>Order Summary</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map(item => (
                    <tr key={item.menu_id}>
                      <td>{item.item_name}</td>
                      <td>
                        <button onClick={() => changeQuantity(item.menu_id, false)}>-</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => changeQuantity(item.menu_id, true)}>+</button>
                      </td>
                      <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                      <IconButton 
                    onClick={() => deleteMenuItem(item.menu_id)} 
                    color="error"
                  >                    
                  <DeleteIcon />
                  </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Summary */}
              <div className="total-summary">
                <p>Overall Total:₱{selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
              </div>

              <div className="order-actions">
                <button onClick={viewSelectedItemsDetails} disabled={selectedItems.length === 0}>Checkout</button>
                <button onClick={startOver}>Start Over</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
