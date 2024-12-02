import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './App.css';

const ViewUnavailableMenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUnavailableMenuItems();
    }, []);

    const fetchUnavailableMenuItems = async () => {
        const response = await axios.get('http://localhost:8080/tes/menu/getUnavailableMenu'); // Fetch all items
        const unavailableItems = response.data.filter(item => item.status === 'Not Available'); // Filter unavailable items
        setMenuItems(unavailableItems);
    };

    const editMenuItem = (item) => {
        navigate('/MenuItem/menuitem', { state: { item } });
    };

    const deleteMenuItem = async (menu_id) => {
        await axios.delete(`http://localhost:8080/tes/menu/deleteMenuitem/${menu_id}`);
        fetchUnavailableMenuItems();
    };

    return (
        <div className="menu-container">
            <h1>UNAVAILABLE ITEMS</h1>
            <div className="menu-cards">
                {menuItems.length > 0 ? (
                    menuItems.map(item => (
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
                    ))
                ) : (
                    <p>No unavailable items found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewUnavailableMenuItems;
