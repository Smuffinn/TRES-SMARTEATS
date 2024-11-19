import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './white_background.png';
import chooseRoleImage from './choose-role.png';

const ChooseRole = () => {
  return (
    <div className="choose-role-container">
      {/* Minimal Header */}

<header className="choose-role-header">
<Link to="/">
  <img src={chooseRoleImage} alt="Logo" className="choose-role-logo" />
</Link>
</header>

{/* Main Content */}
<div className="choose-role-content">
<div className="image-side">
  <img src={logo} alt="Role Selection" className="role-image" />
</div>
<div className="content-side">
  <h2 className="choose-role-title">Please Choose:</h2>
  <div className="button-group">
    <Link to="/choose">
      <button className="role-customer">CUSTOMER</button>
    </Link>
    <Link to="/Staff/staff">
      <button className="role-staff">STAFF</button>
    </Link>
  </div>
</div>
</div>
</div>
);
};

export default ChooseRole;