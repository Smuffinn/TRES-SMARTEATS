import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MenuItem.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';

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

    return (
        <div className="menu-layout">
            <div className="menu-sidebar">
                <h3>Navigation</h3>
                <p>Left sidebar can have navigation links here.</p>
            </div>

            <div className="menu-container">
                <div className="menu-header">
                    <h2>Available Items</h2>
                    <button className="view-unavailable" onClick={handleToggleUnavailable}>
                        &gt; View Unavailable Items
                    </button>
                </div>
                {/* Pagination controls */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                    >
                        Back
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            Page {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            

                <div className="menu-cards">
                    {currentItems.map((item) => (
                        <div className="menu-card" key={item.menu_id}>
                            <img
                                src={item.image_url || defaultImage}
                                alt={item.item_name || 'No Image'}
                            />
                            <h4>{item.item_name}</h4>
                            <p>Price: ₱{item.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.menu_id)}>Delete</button>
                        </div>
                    ))}
                    
                </div>
                
            </div>

            <div className="menu-sidebar">
                <h3>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Item Name"
                        variant="outlined"
                        value={formItem.item_name}
                        onChange={(e) => setFormItem({ ...formItem, item_name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={formItem.price}
                        onChange={(e) => setFormItem({ ...formItem, price: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
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
                            <MenuItem value="Rice Meals">Rice Meals</MenuItem>
                            <MenuItem value="Desserts">Desserts</MenuItem>
                            <MenuItem value="Snacks">Snacks</MenuItem>
                            <MenuItem value="Drinks">Drinks</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={formItem.status}
                            onChange={(e) => setFormItem({ ...formItem, status: e.target.value })}
                        >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Not Available">Not Available</MenuItem>
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
                    <button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</button>
                </form>
            </div>
        </div>
    );
};

export default Menuitem;
