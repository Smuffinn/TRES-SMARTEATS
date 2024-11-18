import React from 'react';
import './Customer.css';

const MenuItem = ({ name, image, description, price, addToCart }) => {
  return (
    <div className="menu-item">
      <img src={image} alt={name} className="menu-item-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
      <button onClick={() => addToCart(name, price)} className="add-to-cart">Add to Cart</button>
    </div>
  );
};

const MenuDisplay = ({ items, addToCart }) => {
  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="menu-list">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            image={item.image}
            description={item.description}
            price={item.price}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuDisplay;
