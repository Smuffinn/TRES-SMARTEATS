// src/MenuItemDetails.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Ensure your CSS file is imported

const MenuItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { items } = location.state || { items: [] };

    // Function to handle order button click
    const handleOrderClick = () => {
        navigate('/order'); // Navigate to the /order route
    };

    return (
        <div className="menu-details-container">
            <h2>SELECTED MENU ITEMS</h2>
            {items.length > 0 ? (
                <div className="menu-grid">
                    {items.map(item => (
                        <div key={item.menu_id} className="menu-item-details">
                            <img 
                                src={item.image_url} 
                                alt={item.item_name} 
                                className="menu-item-image" // Use CSS class for styling
                            />
                            <div className="menu-item-info">
                                <h3>{item.item_name}</h3>
                                <p>Price: ₱{item.price.toFixed(2)}</p>
                                <p>Status: {item.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No items selected.</p>
            )}
            {/* Order Button */}
            <button onClick={handleOrderClick} className="order-button">Order</button>
        </div>
    );
};

export default MenuItemDetails;
