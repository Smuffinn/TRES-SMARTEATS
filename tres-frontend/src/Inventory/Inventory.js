// src/Inventory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import './App.css';  // Import CSS file
import { Box, TextField } from '@mui/material';

const Inventory = () => {
    const [inventories, setInventories] = useState([]);
    const [newInventory, setNewInventory] = useState({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' });
    const [editingInventory, setEditingInventory] = useState(null); // State for editing inventory
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation(); // Get location for passed state

    useEffect(() => {
        fetchInventories();

        // Set the restock date to the current date
        const currentDate = new Date().toISOString().split('T')[0];
        setNewInventory((prevInventory) => ({ ...prevInventory, restock_date: currentDate }));

        // Check if there's inventory data passed from the InventoryList
        if (location.state && location.state.inventory) {
            setNewInventory(location.state.inventory); // Populate with inventory to edit
            setEditingInventory(location.state.inventory); // Set the editing inventory
        }
    }, [location.state]); // Run effect when the state changes

    const fetchInventories = async () => {
        const response = await axios.get('http://localhost:8080/tes/inventory/getAllInventories');
        setInventories(response.data);
    };

    const addInventory = async (event) => {
        event.preventDefault(); // Prevent the form from submitting
    
        try {
            if (editingInventory) {
                // If editing, update the existing inventory
                await axios.put(`http://localhost:8080/tes/inventory/putInventoryDetails?inventory_id=${editingInventory.inventory_id}`, newInventory);
                setEditingInventory(null); // Clear editing state after update
            } else {
                // Otherwise, add a new inventory
                await axios.post('http://localhost:8080/tes/inventory/insertInventory', newInventory);
            }
            fetchInventories(); // Refresh the inventory list
            setNewInventory({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' }); // Clear form
        } catch (error) {
            console.error("Error adding/updating inventory:", error);
            // Optionally display an error message to the user
        }
    };
    const navigateToInventoryTable = () => {
        navigate('/Inventory/inventory-table'); // Navigate to InventoryTable component
    };

    return (
        <div className="container">

            <h1>INVENTORY</h1>
            <form onSubmit={addInventory}>
            <TextField
                type="text"
                label="Stock Quantity"
                variant="outlined"
                value={newInventory.stock_quantity}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                        setNewInventory({ ...newInventory, stock_quantity: value });
                    }
                }}
                sx={{ marginBottom: 2 }}  // Adding space below the TextField
            />

            <TextField
                type="date"
                // label="Restock Date"
                value={newInventory.restock_date}
                onChange={(e) => setNewInventory({ ...newInventory, restock_date: e.target.value })}
                sx={{ marginBottom: 2 }}  // Adding space below the TextField
            />

            <TextField
                type="text"
                label="Supplier"
                variant="outlined"
                value={newInventory.supplier}
                onChange={(e) => setNewInventory({ ...newInventory, supplier: e.target.value })}
                sx={{ marginBottom: 2 }}  // Adding space below the TextField
            />

            

                <button type="submit">
                    {editingInventory ? 'Update Inventory' : 'Add Inventory'}
                </button>
               
                <button type="button" onClick={navigateToInventoryTable}>
                    Inventory List
                </button>
            </form>
        </div>
    );
};

export default Inventory;