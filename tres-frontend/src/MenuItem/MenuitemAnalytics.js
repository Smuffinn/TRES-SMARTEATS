import React, { useState, useEffect } from 'react';
//import './App.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MenuItemAnalytics = () => {
  const [items, setItems] = useState([
    { name: 'Burger', stock: 20, sales: 100 },
    { name: 'Pizza', stock: 5, sales: 200 },
    { name: 'Soda', stock: 50, sales: 300 },
    { name: 'Fries', stock: 10, sales: 150 },
  ]);

  const [stockData, setStockData] = useState([
    { date: '2024-11-01', stock: 50 },
    { date: '2024-11-02', stock: 45 },
    { date: '2024-11-03', stock: 40 },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          stock: item.stock - Math.floor(Math.random() * 5),
        }))
      );
    }, 5000); // Updates every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const StockOverview = ({ items }) => (
    <div className="stock-overview">
      <h2>Menu Item Stock Overview</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong>: {item.stock} units in stock
            <span className={`stock-status ${item.stock < 10 ? 'low' : 'ok'}`}>
              {item.stock < 10 ? 'Low Stock' : 'In Stock'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const StockTrendChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="stock" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );

  const StockAlerts = ({ items }) => {
    const [alert, setAlert] = useState('');

    useEffect(() => {
      items.forEach((item) => {
        if (item.stock < 5) {
          setAlert(`Alert: ${item.name} stock is running low!`);
        }
      });
    }, [items]);

    return (
      <div className="stock-alerts">
        {alert && <div className="alert">{alert}</div>}
      </div>
    );
  };

  const TopSellingItems = ({ items }) => {
    const topItems = items.sort((a, b) => b.sales - a.sales).slice(0, 5);

    return (
      <div className="top-selling">
        <h3>Top 5 Selling Items</h3>
        <ul>
          {topItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.sales} sales
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const RealTimeStockUpdates = ({ items }) => {
    return (
      <div className="real-time-updates">
        <h3>Real-Time Stock Updates</h3>
        {items.map((item, index) => (
          <div key={index}>
            <strong>{item.name}</strong>: {item.stock} units left
          </div>
        ))}
      </div>
    );
  };

  const StockSummary = ({ items }) => {
    const totalStock = items.reduce((total, item) => total + item.stock, 0);
    const lowStockItems = items.filter((item) => item.stock < 5).length;
    const highStockItems = items.filter((item) => item.stock > 50).length;

    return (
      <div className="stock-summary">
        <h2>Overall Stock Summary</h2>
        <ul>
          <li>Total Stock: {totalStock}</li>
          <li>Low Stock Items (under 5): {lowStockItems}</li>
          <li>High Stock Items (over 50): {highStockItems}</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="analytics-page">
      <StockOverview items={items} />
      <StockTrendChart data={stockData} />
      <StockAlerts items={items} />
      <TopSellingItems items={items} />
      <RealTimeStockUpdates items={items} />
      <StockSummary items={items} />
    </div>
  );
};

export default MenuItemAnalytics;