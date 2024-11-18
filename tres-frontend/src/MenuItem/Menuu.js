// src/ViewAllMenuItems.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './App.css'; // Import CSS file for styling

const ViewMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // State to track selected items
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
        setMenuItems(response.data);
    };

    const toggleSelectMenuItem = (item) => {
        // Check if the item is already selected
        if (selectedItems.includes(item.menu_id)) {
            // Remove it from the selected items if it is already selected
            setSelectedItems(selectedItems.filter(id => id !== item.menu_id));
        } else {
            // Add the item to the selected items
            setSelectedItems([...selectedItems, item.menu_id]);
        }
    };

    const viewSelectedItemsDetails = () => {
        // Navigate to the MenuItemDetails page and pass the selected items
        const selectedItemsDetails = menuItems.filter(item => selectedItems.includes(item.menu_id));
        navigate('/MenuItem/menuitemdetails', { state: { items: selectedItemsDetails } }); // Assuming your MenuItemDetails component can handle multiple items
    };

    return (
        <div className="menu-container">
            <h2>ALL MENU ITEMS</h2>
            <div className="menu-cards">
                {menuItems.map(item => (
                    <div 
                        className={`menu-card ${selectedItems.includes(item.menu_id) ? 'selected' : ''}`} // Add selected class for visual feedback
                        key={item.menu_id} 
                        onClick={() => toggleSelectMenuItem(item)} // Toggle selection on click
                        style={{ cursor: 'pointer' }} // Indicate that the card is clickable
                    >
                        <img 
                            src={item.image_url} 
                            alt={item.item_name} 
                            style={{ width: '100%', height: 'auto' }} 
                        />
                        <h3>{item.item_name}</h3>
                        <p>Price: ₱{item.price.toFixed(2)}</p> 
                        <p>Status: {item.status}</p> 
                    </div>
                ))}
            </div>
            <button onClick={viewSelectedItemsDetails} disabled={selectedItems.length === 0}>View Selected Items</button>
        </div>
    );
};

export default ViewMenu;
