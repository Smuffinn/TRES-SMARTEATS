import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuItem.css';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, FormControl, InputLabel, Select, MenuItem as MuiMenuItem } from '@mui/material';
import logo1 from '../white_background.png';

const Menuitem = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formItem, setFormItem] = useState({
        item_name: '',
        price: '',
        quantity: '',
        category: '',
        status: '',
        image_url: '',
    });
    const [editingItem, setEditingItem] = useState(null);
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [unavailableItems, setUnavailableItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const defaultImage = '/MenuItem/item_not_available.png';

    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const fetchUnavailableItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tes/menu/getUnavailableMenu');
            setUnavailableItems(response.data);
        } catch (error) {
            console.error('Error fetching unavailable items:', error);
        }
    };

    const handleToggleUnavailable = () => {
        fetchUnavailableItems();
        setShowUnavailable(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemName = formItem.item_name.trim();
        const price = String(formItem.price).trim();
        const quantity = String(formItem.quantity).trim();
        const category = formItem.category.trim();
        const status = formItem.status.trim();
    
        // Validation for empty fields
        if (!itemName || !price || !quantity || !category || !status) {
            alert('Please fill out all required fields before submitting.');
            return;
        }
    
        try {
            if (editingItem) {
                await axios.put(
                    `http://localhost:8080/tes/menu/putMenuitemDetails/${editingItem.menu_id}`,
                    formItem
                );
            } else {
                await axios.post('http://localhost:8080/tes/menu/insertMenu', formItem);
            }
            fetchMenuItems();
            resetForm();
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };
    
    const handleEdit = (item) => {
        setEditingItem(item);
        setFormItem({
            ...formItem, // Ensure all properties exist in the form
            ...item,
        });
    };

    const handleDelete = async (menu_id) => {
        try {
            await axios.delete(`http://localhost:8080/tes/menu/deleteMenuitem/${menu_id}`);
            fetchMenuItems();
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    const resetForm = () => {
        setFormItem({
            item_name: '',
            price: '',
            quantity: '',
            category: '',
            status: '',
            image_url: '',
        });
        setEditingItem(null);
    };

    const availableItems = menuItems.filter((item) => item.status === 'Available' && item.quantity > 0);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = availableItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(availableItems.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewStaffDashboard = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/Staff/staffdashboard');
        } else {
            navigate('/Staff/staff');
        }
    };

    return (
        <div className="contain">
            <div className="main">  
                <div className="content-wrapper">
                    <div className="nav-sidebar">
                        <button>
                            <div className="button-content">
                                <img src="/navsidebarpics/all.png" alt="All" className="category-icon" />
                                <span className="category-text">All Items</span>
                            </div>
                        </button>
                        <button>
                            <div className="button-content">
                                <img src="https://cdn-icons-png.flaticon.com/512/4497/4497535.png" alt="Add" className="category-icon" />
                                <span className="category-text">Add New Item</span>
                            </div>
                        </button>
                        <button>
                            <div className="button-content">
                                <img src="https://cdn0.iconfinder.com/data/icons/essentials-marketing-2-1/128/block-disable-unavailable-ban-512.png" alt="Unavailable" className="category-icon" />
                                <span className="category-text">Unavailable Items</span>
                            </div>
                        </button>
                        <button onClick={handleViewStaffDashboard}>
                            <div className="button-content">
                                <img src="https://www.creativefabrica.com/wp-content/uploads/2021/04/17/Dashboard-SVG-Typography-Graphics-10986754-1.png" alt="Staff" className="category-icon" />
                                <span className="category-text">Staff Dashboard</span>
                            </div>
                        </button>
                    </div>

                    <div className="menu-container">
                        <div className="menu-cards">
                            {currentItems.map((item) => (
                                <div className="menu-card" key={item.menu_id}>
                                    <img
                                        src={item.image_url || defaultImage}
                                        alt={item.item_name}
                                    />
                                    <h3>{item.item_name}</h3>
                                    <p>Price: ₱{item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Status: {item.status}</p>
                                    <div className="button-container">
                                        <button onClick={() => handleEdit(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item.menu_id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="pagination">
                            <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}>
                                Back
                            </button>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    <div className="order-summary">
                        <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Item Name"
                                value={formItem.item_name}
                                onChange={(e) => setFormItem({ ...formItem, item_name: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Price"
                                value={formItem.price}
                                onChange={(e) => setFormItem({ ...formItem, price: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Quantity"
                                value={formItem.quantity}
                                onChange={(e) => setFormItem({ ...formItem, quantity: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={formItem.category}
                                    onChange={(e) => setFormItem({ ...formItem, category: e.target.value })}
                                >
                                    <MuiMenuItem value="Rice Meals">Rice Meals</MuiMenuItem>
                                    <MuiMenuItem value="Desserts">Desserts</MuiMenuItem>
                                    <MuiMenuItem value="Snacks">Snacks</MuiMenuItem>
                                    <MuiMenuItem value="Drinks">Drinks</MuiMenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={formItem.status}
                                    onChange={(e) => setFormItem({ ...formItem, status: e.target.value })}
                                >
                                    <MuiMenuItem value="Available">Available</MuiMenuItem>
                                    <MuiMenuItem value="Not Available">Not Available</MuiMenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Image URL"
                                variant="outlined"
                                value={formItem.image_url}
                                onChange={(e) => setFormItem({ ...formItem, image_url: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <div className="buttons">
                                <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
                                <button type="button" onClick={resetForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menuitem;
