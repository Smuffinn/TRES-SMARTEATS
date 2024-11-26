
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Make sure to update this CSS file
import logo from './white_background.png';
import dineInImage from './dine.png'; // Add path to your Dine In image
import takeOutImage from './takeout.png'; // Add path to your Takeout image
import chooseRoleImage from './choose-role.png';
const Choose = () => {
  return (
    <div className="choose-role-container">
      {/* Left side: Image */}
      <div className="image-side">
        <img
          src={chooseRoleImage}
          alt=""
          className="role-image"
        />
      </div>

      {/* Right side: Logo and options */}
      <div className="content-side">
       <Link to="/"> <img src={logo} alt="Logo" className="logo" /></Link>
        <h2 className="choose-role">Please Choose:</h2>
        <br />
        <br />
        <div className="image-button-group">
  {/* Dine In Image Link and Button */}
  <div className="option-container">
    <Link to="/MenuItem/view-menu" className="image-link">
      <img 
        src={dineInImage} 
        alt="Dine In" 
        className="option-image"
      />
      <button className="option-button">DINE IN</button>
    </Link>
  </div>
  
  {/* Takeout Image Link and Button */}
  <div className="option-container">
    <Link to="/MenuItem/view-menu" className="image-link">
      <img 
        src={takeOutImage} 
        alt="Takeout" 
        className="option-image"
      />
      <button className="option-button">TAKE OUT</button>
    </Link>
  </div>
</div>

      </div>
    </div>
  );
};

export default Choose;
