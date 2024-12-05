import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './white_background.png';
import chooseRoleImage from './choose-role.png';

const ChooseRole = () => {
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
        <Link to="/"> <img src={logo} alt="Logo"  className="role-image" /></Link>
        {/* <img src={logo} alt="Role Selection"/> */}
      </div>
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