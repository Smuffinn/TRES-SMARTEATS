import React from 'react';

const StockOverview = ({ items }) => {
  return (
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
};

export default StockOverview;
