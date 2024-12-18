// src/ViewAllMenuItems.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './App.css'; // Import CSS file for styling

const ViewAllMenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
        setMenuItems(response.data);
    };

    const editMenuItem = (item) => {
        // Navigate to the Menuitem page and set the item to be edited
        navigate('/MenuItem/menuitem', { state: { item } }); // Assuming your Menuitem component handles the state
    };

    const deleteMenuItem = async (menu_id) => {
        await axios.delete(`http://localhost:8080/tes/menu/deleteMenuitem/${menu_id}`);
        fetchMenuItems(); // Refresh the list after deletion
    };

    return (
        <div className="menu-container">
            
            <div className="menu-cards">
                {menuItems.map(item => (
                    <div className="menu-card" key={item.menu_id}>
                        <img src={item.image_url} alt={item.item_name} style={{ width: '100%', height: 'auto' }} />
                        <h3>{item.item_name}</h3>
                        <p>Price: ₱{item.price.toFixed(2)}</p> 
                        <p>Status: {item.status}</p> 
                        <div className="button-group">
                            <button onClick={() => editMenuItem(item)}>Edit</button>
                            <button onClick={() => deleteMenuItem(item.menu_id)} className="delete-button">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllMenuItems;
