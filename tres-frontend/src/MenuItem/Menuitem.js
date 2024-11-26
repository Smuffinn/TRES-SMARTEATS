import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './App.css'; 
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';

const Menuitem = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ item_name: '', price: '', category: '', status: '', image_url: '' });
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchMenuItems();
        if (location.state && location.state.item) {
            setEditingItem(location.state.item);
            setNewItem(location.state.item);
        }
    }, [location.state]);

    const fetchMenuItems = async () => {
        const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
        setMenuItems(response.data);
    };

    const addMenuItem = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await axios.post('http://localhost:8080/tes/menu/insertMenu', newItem);
        fetchMenuItems();
        resetForm();
    };

    const updateMenuItem = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await axios.put(`http://localhost:8080/tes/menu/putMenuitemDetails/${editingItem.menu_id}`, newItem);
        fetchMenuItems();
        resetForm();
        setEditingItem(null);
    };

    const navigateToViewAll = () => {
        navigate('/MenuItem/view-all'); 
        navigate('/MenuItem/viewallitems'); 
    };

    const resetForm = () => {
        setNewItem({ item_name: '', price: '', category: '', status: '', image_url: '' });
        setEditingItem(null);
    };

    return (
        <div className="container">
            <h1>MENU ITEM</h1>
            <form onSubmit={editingItem ? updateMenuItem : addMenuItem}>
                <TextField
                    id="item-name"
                    label="Item Name"
                    variant="outlined"
                    value={newItem.item_name}
                    onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="price"
                    label="Price"
                    
                    value={newItem.price}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                            setNewItem({ ...newItem, price: value });
                        }
                    }}
                    fullWidth
                    margin="normal"
                />
            <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Select Category</InputLabel>
                <Select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    label="Select Category"
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                textAlign: 'left', // Ensure options are left-aligned
                            },
                        },
                    }}
                    sx={{ textAlign: 'left' }} // Ensures selected item aligns to the left
                >
                    <MenuItem value="Rice Meals">Rice Meals</MenuItem>
                    <MenuItem value="Desserts">Desserts</MenuItem>
                    <MenuItem value="Snacks">Snacks</MenuItem>
                    <MenuItem value="Drinks">Drinks</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Select Status</InputLabel>
                <Select
                    value={newItem.status} // Set to status instead of category
                    onChange={(e) => setNewItem({ ...newItem, status: e.target.value })} // Update status field
                    label="Select Status"
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                textAlign: 'left', // Ensure options are left-aligned
                            },
                        },
                    }}
                    sx={{ textAlign: 'left' }} // Ensures selected item aligns to the left
                >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Not Available">Not Available</MenuItem>
                </Select>
            </FormControl>
                <TextField
                    id="image-url"
                    label="Image URL"
                    variant="outlined"
                    value={newItem.image_url}
                    onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                {newItem.image_url && (
                    <div className="image-preview">
                        <h4>Image Preview:</h4>
                        <img
                            src={newItem.image_url}
                            alt="Preview"
                            style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                        />
                    </div>
                )}
                <button type="submit">
                    {editingItem ? 'Update Menu Item' : 'Add Menu Item'}
                </button>
                <button type="button" onClick={navigateToViewAll}>
                    View All Items
                </button>
            </form>
        </div>
    );
};

export default Menuitem;
