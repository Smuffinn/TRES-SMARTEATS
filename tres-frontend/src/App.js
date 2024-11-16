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
  const [paymentData, setPaymentData] = useState([]);
  const [staffData, setStaffData] = useState([]); // Add state for staff data
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
<div style={{ backgroundColor: 'maroon', minHeight: '100vh', color: 'white' }}>
    {!isLandingPage && (
      <nav className="navbar">
        <Link to="/home/home" className="logo-container">
          <img src={logo1} alt="CITU - SMART EATS Logo" className="logo" />
        </Link>
        {/* <button className="menu-icon" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="menu-overlay">
            <div className="menu-options"> */}
              <Link to="/MenuItem/menuitem" className={`button ${isActive('/menuitem') ? 'active' : ''}`}>MENU ITEM</Link>
              <Link to="/Inventory/inventory" className={`button ${isActive('/inventory') ? 'active' : ''}`}>INVENTORY</Link>
              <Link to="/MenuItem/view-menu" className={`button ${isActive('/view-menu') ? 'active' : ''}`}>MENU</Link>
              <Link to="/Payment/payment" className={`button ${isActive('/payment') ? 'active' : ''}`}>PAYMENT</Link>
              <Link to="/Staff/staff" className={`button ${isActive('/staff') ? 'active' : ''}`}>STAFF</Link>
              <Link to="/about" className={`button ${isActive('/about')? 'active': ''}`}>ABOUT US</Link>
              <Link to="/analytics" className={`button ${isActive('/analytics')? 'active': ''}`}>ANALYTICS</Link>
              <Link to="/accountsettings" className={`button ${isActive('/accontsettings')? 'active': ''}`}>SETTINGS</Link>
            {/* </div>
          </div> */}

      </nav>
    )}

  
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/MenuItem/menuitem" element={<MenuItem />} />
        <Route path="/MenuItem/view-all" element={<ViewAllItems />} />
        <Route path="/Inventory/inventory" element={<Inventory />} />
        <Route path="/Inventory/inventory-table" element={<InventoryList />} />
        <Route path="/Login & Register/register" element={<Registration />} />
        <Route path="/Home/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Payment/payment" element={<Payment paymentData={paymentData} setPaymentData={setPaymentData} />} />
        <Route path="/Payment/payment-list" element={<PaymentList payments={paymentData} />} />
        <Route path="/Staff/staff" element={<Staff staffData={staffData} setStaffData={setStaffData} />} />
        <Route path="/Staff/staff-list" element={<StaffList />} />
        <Route path="/Student/student" element={<Student />} />
        <Route path="/Order/order" element={<Order />} />
        <Route path="/studentinfo" element={<StudentInfo />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/MenuItem/view-menu" element={<Menu />} />
        <Route path="/MenuItem/menuitemdetails" element={<MenuItemDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<MenuItemAnalytics />} />
        <Route path="/accountsettings" element={<AccountSettings />} />

      </Routes>
    </div>
  );
};

export default App;
