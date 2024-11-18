import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/getOrder');
      if (response.data && response.data.orders) {
        setOrders(response.data.orders); // Ensure this matches the structure of your API response
      } else {
        console.error('Invalid response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const editOrder = (order) => {
    navigate('/Order/order', { state: { order } });
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/deleteOrder/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="order-list-container">
      <h1>Order List</h1>
      {orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.Order_ID}>
                <td>{order.Order_ID}</td>
                <td>{order.Customer_Name}</td>
                <td>{order.Order_Date}</td>
                <td>{order.Order_Time}</td>
                <td>{order.Total_Amount}</td>
                <td>
                  <button onClick={() => editOrder(order)}>Edit</button>
                  <button onClick={() => deleteOrder(order.Order_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default OrderList;