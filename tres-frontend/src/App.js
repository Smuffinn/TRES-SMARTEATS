import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import MenuItem from './MenuItem/Menuitem';
import Inventory from './Inventory/Inventory';
import ViewAllItems from './MenuItem/Viewallitems';
import './App.css';
import InventoryList from './Inventory/Inventorytable';
import Registration from './Login & Register/Register';
import Home from './Home/Home';
import Login from './Login & Register/Login';
import Payment from './Payment/Payment';
import Staff from './Staff/Staff';
import PaymentList from './Payment/PaymentList';
import StaffList from './Staff/StaffList';
import Student from './Student/Student';
import Order from './Order/Order';
import StudentInfo from './Student/StudentInfo';
import StudentList from './Student/StudentList';
import Menu from './MenuItem/Menuu';
import MenuItemDetails from './MenuItem/Menudetails';
import Landing from './Landing';
import logo1 from './white_background.png';
import About from './AboutUs';
import MenuItemAnalytics from './MenuItem/MenuitemAnalytics';
import AccountSettings from './AccountSettings';
// import { Button } from '@mui/material';

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
<div style={{ backgroundColor: 'maroon', minHeight: '100vh', color: 'white' }}>
    {!isLandingPage && (
      <nav className="navbar">
        <Link to="/home" className="logo-container">
          <img src={logo1} alt="CITU - SMART EATS Logo" className="logo" />
        </Link>
        {/* <button className="menu-icon" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="menu-overlay">
            <div className="menu-options"> */}
              <Link to="/menuitem" className={`button ${isActive('/menuitem') ? 'active' : ''}`}>MENU ITEM</Link>
              <Link to="/inventory" className={`button ${isActive('/inventory') ? 'active' : ''}`}>INVENTORY</Link>
              <Link to="/view-menu" className={`button ${isActive('/view-menu') ? 'active' : ''}`}>MENU</Link>
              <Link to="/payment" className={`button ${isActive('/payment') ? 'active' : ''}`}>PAYMENT</Link>
              <Link to="/staff" className={`button ${isActive('/staff') ? 'active' : ''}`}>STAFF</Link>
              <Link to="/about" className={`button ${isActive('/about')? 'active': ''}`}>ABOUT US</Link>
              <Link to="/analytics" className={`button ${isActive('/analytics')? 'active': ''}`}>ANALYTICS</Link>
              <Link to="/accountsettings" className={`button ${isActive('/accontsettings')? 'active': ''}`}>SETTINGS</Link>
            {/* </div>
          </div> */}

      </nav>
    )}

  
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menuitem" element={<MenuItem />} />
        <Route path="/view-all" element={<ViewAllItems />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory-table" element={<InventoryList />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-list" element={<PaymentList />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff-list" element={<StaffList />} />
        <Route path="/student" element={<Student />} />
        <Route path="/order" element={<Order />} />
        <Route path="/studentinfo" element={<StudentInfo />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/view-menu" element={<Menu />} />
        <Route path="/menuitemdetails" element={<MenuItemDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<MenuItemAnalytics />} />
        <Route path="/accountsettings" element={<AccountSettings />} />

      </Routes>
    </div>
  );
};

export default App;
