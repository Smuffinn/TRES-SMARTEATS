import React, { useState, useEffect } from "react";
import './Draft.css';

const Orders = () => {
  const [newOrder, setNewOrder] = useState({
    customer_name: "",
    total_price: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send new order to backend API
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewOrder({
          customer_name: "",
          total_price: "",
          status: "Pending",
        });
      });
  };

  return (
    <div>
      <h1>Order Management</h1>

      {/* Form for creating a new order */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={newOrder.customer_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Total Price</label>
          <input
            type="number"
            name="total_price"
            value={newOrder.total_price}
            onChange={handleInputChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add Order</button>
      </form>
    </div>
  );
};

export default Orders;
