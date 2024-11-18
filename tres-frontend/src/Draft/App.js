import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from './Draft';
import './Draft.css';
import Orders from "./StaffOrder";
import OrderList from "./OrderList";
import InventoryList from "./InventoryList";
import Inventory from "./Inventory";
import MenuManagement from "./MenuManagement";
import OrderPlacement from "./OrderPlacement";
import MenuDisplay from "./MenuDisplay";
import PaymentOptions from "./PaymentOptions";
import OrderConfirmation from "./OrderConfirmation";


const App = () => {
  const menuItems = [
    { name: 'Burger', image: 'burger.jpg', description: 'Delicious beef burger', price: 5.99 },
    { name: 'Pizza', image: 'pizza.jpg', description: 'Cheesy pizza', price: 7.99 },
    { name: 'Salad', image: 'salad.jpg', description: 'Fresh vegetable salad', price: 3.99 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (name, price) => {
    setCart([...cart, { name, price }]);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* Sidebar Component */}
      <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
        <Routes>
          <Route path="/staff/orders" element={<Orders />} />
          <Route path="/staff/orderlist" element={<OrderList />} />
          <Route path="/staff/inventory" element={<Inventory/>} />
          <Route path="/staff/inventorylist" element={<InventoryList />} />
          <Route path="/staff/menu" element={<MenuManagement />} />
          
          {/* Add Route for Customer-side features */}
          <Route path="/customer/menu" element={<MenuDisplay items={menuItems} addToCart={addToCart} />} />
          <Route path="/customer/order" element={<OrderPlacement />} />
          <Route path="/customer/payment" element={<PaymentOptions totalAmount={cart.reduce((total, item) => total + item.price, 0)} />} />
          <Route path="/customer/confirmation" element={<OrderConfirmation/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
