import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './white_background.png';
import chooseRoleImage from './choose-role.png';
import dineInImage from './dine.png'; // Path to your Dine In image
import takeOutImage from './takeout.png'; // Path to your Takeout image

const Choose = () => {
  return (
    <div className="choose-role-container">
      {/* Minimal Header */}
      <div className="choose-role-header">
        <img src={chooseRoleImage} alt="" className="image-side" />
      </div>

      {/* Main Content */}
      <div className="choose-role-content">
        <div className="content-side">
          <div className="image-side">
            <Link to="/">
              <img src={logo} alt="Logo" className="role-image" />
            </Link>
          </div>
          <h2 className="choose-role-title">Please Choose:</h2>
          <div className="image-button-group">
            {/* Dine In Image and Button */}
            <div className="option-container">
              <Link to="/MenuItem/view-menu" className="image-link">
                <img
                  src={dineInImage}
                  alt="Dine In"
                  className="option-image"
                />
                <button className="role-customer">DINE IN</button>
              </Link>
            </div>

            {/* Takeout Image and Button */}
            <div className="option-container">
              <Link to="/MenuItem/view-menu" className="image-link">
                <img
                  src={takeOutImage}
                  alt="Takeout"
                  className="option-image"
                />
                <button className="role-staff">TAKE OUT</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
