import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Draft.css';
import { Box, TextField } from '@mui/material';

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [inventoryForm, setInventoryForm] = useState({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' });
  const [editingInventory, setEditingInventory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchInventories();
    if (location.state && location.state.inventory) {
      setInventoryForm(location.state.inventory); // Pre-fill form for editing
      setEditingInventory(location.state.inventory);
    }
  }, [location.state]);

  const fetchInventories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tes/inventory/getAllInventories');
      setInventories(response.data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  const addInventory = async (event) => {
    event.preventDefault();
    try {
      if (editingInventory) {
        await axios.put(`http://localhost:8080/tes/inventory/putInventoryDetails?inventory_id=${editingInventory.inventory_id}`, inventoryForm);
        setEditingInventory(null);
      } else {
        await axios.post('http://localhost:8080/tes/inventory/insertInventory', inventoryForm);
      }
      fetchInventories();
      setInventoryForm({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' });
    } catch (error) {
      console.error('Error adding/updating inventory:', error);
    }
  };

  const deleteInventory = async (inventory_id) => {
    try {
      await axios.delete(`http://localhost:8080/tes/inventory/deleteInventoryDetails/${inventory_id}`);
      fetchInventories();
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const filteredInventory = inventories.filter(item =>
    item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Inventory Management</h1>

      {/* Search Bar */}
      <div>
        <label>Search Inventory:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search inventory..."
        />
      </div>

      {/* Form for Add/Edit Inventory */}
      <form onSubmit={addInventory}>
        <Box spacing={2} display="flex" flexDirection="column">
          <TextField
            type="number"
            label="Stock Quantity"
            variant="outlined"
            value={inventoryForm.stock_quantity}
            onChange={(e) => setInventoryForm({ ...inventoryForm, stock_quantity: e.target.value })}
          />
          <TextField
            type="date"
            label="Restock Date"
            variant="outlined"
            value={inventoryForm.restock_date}
            onChange={(e) => setInventoryForm({ ...inventoryForm, restock_date: e.target.value })}
          />
          <TextField
            label="Supplier"
            variant="outlined"
            value={inventoryForm.supplier}
            onChange={(e) => setInventoryForm({ ...inventoryForm, supplier: e.target.value })}
          />
        </Box>

        <button type="submit">
          {editingInventory ? 'Update Inventory' : 'Add Inventory'}
        </button>

        <button type="button" onClick={() => navigate('/staff/inventorylist')}>
          View Inventory List
        </button>
      </form>

      {/* Display Filtered Inventory
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item.inventory_id}>
              <td>{item.supplier}</td>
              <td>{item.stock_quantity}</td>
              <td>
                <button onClick={() => navigate("/inventory", { state: { inventory: item } })}>Edit</button>
                <button onClick={() => deleteInventory(item.inventory_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Inventory;
