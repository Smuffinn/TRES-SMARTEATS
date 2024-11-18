import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom"; // Import useLocation
import './Draft.css';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemStock, setItemStock] = useState("");
  const [itemImageUrl, setItemImageUrl] = useState("");  // New state for image URL
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    item_name: '',
    price: '',
    category: '',
    status: '',
    image_url: ''
  });

  const location = useLocation(); // Use useLocation to access location.state

  useEffect(() => {
    // Fetch menu items
    fetchMenuItems();
    if (location.state && location.state.item) {
      setEditingItem(location.state.item);
      setNewItem(location.state.item); // Populate the form with the item to edit
      setItemName(location.state.item.item_name);
      setItemPrice(location.state.item.price);
      setItemStock(location.state.item.stock);
      setItemImageUrl(location.state.item.image_url);  // Populate the image_url when editing
    }
  }, [location.state]);

  // Fetch all menu items
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // Add new menu item
  const addMenuItem = async (e) => {
    e.preventDefault();

    if (!itemName || !itemPrice || !itemStock || !itemImageUrl) {  // Check for image_url
      alert("Please fill in all fields");
      return;
    }

    const newItemData = {
      item_name: itemName,
      price: parseFloat(itemPrice),
      category: newItem.category,
      status: newItem.status,
      image_url: itemImageUrl  // Include the image URL
    };

    try {
      const response = await axios.post('http://localhost:8080/tes/menu/insertMenu', newItemData);
      setMenuItems((prev) => [...prev, response.data]); // Add new item to the list
      resetForm();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Delete menu item
  const deleteMenuItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/tes/menu/${itemId}`);
      setMenuItems((prev) => prev.filter((item) => item.id !== itemId)); // Remove from list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Update menu item
  const updateMenuItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/tes/menu/putMenuitemDetails/${editingItem.menu_id}`, newItem);
      fetchMenuItems();
      resetForm();
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setItemName("");
    setItemPrice("");
    setItemStock("");
    setItemImageUrl("");  // Reset image_url
    setEditingItem(null);
    setNewItem({
      item_name: '',
      price: '',
      category: '',
      status: '',
      image_url: ''
    });
  };

  return (
    <div>
      <h1>Menu Management</h1>

      {/* Form to add a new menu item */}
      <form onSubmit={editingItem ? updateMenuItem : addMenuItem}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Enter item price"
            step="0.01"
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={itemStock}
            onChange={(e) => setItemStock(e.target.value)}
            placeholder="Enter stock quantity"
          />
        </div>

        <div>
          <label>Image URL:</label> {/* New field for image URL */}
          <input
            type="text"
            value={itemImageUrl}
            onChange={(e) => setItemImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" disabled={!itemName || !itemPrice || !itemStock || !itemImageUrl}>
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* Display the list of menu items in a table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image URL</th> {/* New column for image URL */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.item_name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.stock}</td>
              <td>{item.image_url ? <img src={item.image_url} alt="item" width="50" /> : 'No image'}</td> {/* Display image or message */}
              <td>
                <button onClick={() => deleteMenuItem(item.id)}>Delete</button>
                <button onClick={() => setEditingItem(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
