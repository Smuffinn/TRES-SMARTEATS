import React, { useState } from 'react';
import { Link, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import OrderList from './Order/OrderList';
import StudentInfo from './Student/StudentInfo';
import StudentList from './Student/StudentList';
// import Menu from './MenuItem/Menuu';
import MenuItemDetails from './MenuItem/Menudetails';
import Landing from './Landing';
import logo1 from './white_background.png';
import About from './AboutUs';
import MenuItemAnalytics from './MenuItem/MenuitemAnalytics';
import AccountSettings from './AccountSettings';
import Feedback from './Feedback/Feedback';
import FeedbackList from './Feedback/FeedbackList';
// import DataAnalytics from './DataAnalytics/DataAnalytics';
// import { Button } from '@mui/material';
import ChooseRole from './ChooseRole';
import Choose from './Choose';
import StockOverview from './StockOverview';
import MainMenu from './MenuItem/MainMenu';
import ViewUnavailableMenuItems from './MenuItem/ViewUnavailable';
import OrderSummary from './OrderSummary/OrderSum';
import ConfirmationPage from './MenuItem/ConfirmationPage';
import StaffDashboard from './Staff/StaffDashboard';
// import MenuOrder from './MenuItem/MenuOrder';

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const [paymentData, setPaymentData] = useState([]);
  const [staffData, setStaffData] = useState([]); // Add state for staff data
  const isActive = (path) => location.pathname === path;

    // Check for routes where the navbar should not show
    const isLandingOrChooseRolePage = location.pathname === '/' || location.pathname === '/choose-role' || location.pathname === '/choose' || location
  .pathname==='/MenuItem/view-menu';
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <div style={{ backgroundColor: 'maroon', minHeight: '100vh', color: 'white' }}>
      {/* Navbar is hidden on Landing, ChooseRole, and Choose pages */}
      {!isLandingOrChooseRolePage && (
        <nav className="navbar">
          <Link to="/" className="logo-container">
            <img src={logo1} alt="CITU - SMART EATS Logo" className="logo" />
          </Link>
          <Link to="/MenuItem/menuitem" className={isActive('/MenuItem/menuitem') ? 'active' : ''}>Menu Item</Link>
          <Link to="/Inventory/inventory" className={isActive('/Inventory/inventory') ? 'active' : ''}>Inventory</Link>
          <Link to="/Payment/payment" className={isActive('/Payment/payment') ? 'active' : ''}>Payment</Link>
          <Link to="/Staff/staff" className={isActive('/Staff/staff') ? 'active' : ''}>Staffs</Link>
          {/* <Link to="/Student/student" className={isActive('/Student/student') ? 'active' : ''}>Student</Link> */}
          <Link to="/Order/order" className={isActive('/Order/order') ? 'active' : ''}>Order</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link>
          {/* <Link to="/accountsettings" className={isActive('/accountsettings') ? 'active' : ''}>Account Settings</Link> */}
          <Link to="/Feedback/feedback" className={isActive('/Feedback/feedback') ? 'active' : ''}>Feedback</Link>
          <Link to="/MenuItem/MenuitemAnalytics" className={isActive('/MenuItem/MenuitemAnalytics') ? 'active' : ''}>Data Analytics</Link>
          {/* <Link to="/stock" className={isActive('/stock') ? 'active' : ''}>Stock Overview</Link> */}
          {/* <Link to="/mainmenu" className={isActive('/mainmenu') ? 'active' : ''}>Main Menu</Link> */}

        </nav> 
      )}

  
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/MenuItem/menuitem" element={<MenuItem />} />
        <Route path="/MenuItem/Viewallitems" element={<ViewAllItems />} />
        <Route path="/Inventory/inventory" element={<Inventory />} />
        <Route path="/Inventory/inventory-table" element={<InventoryList />} />
        <Route path="/Login & Register/register" element={<Registration />} />
        <Route path="/Home/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Payment/payment" element={<Payment paymentData={paymentData} setPaymentData={setPaymentData} />} />
        <Route path="/Payment/payment-list" element={<PaymentList payments={paymentData} />} />
        <Route path="/Staff/staff" element={<Staff />} />
        <Route path="/Staff/dashboard" element={
          <PrivateRoute>
            <StaffDashboard />
          </PrivateRoute>
        } />
        <Route path="/Staff/staff-list" element={
          <PrivateRoute>
            <StaffList />
          </PrivateRoute>
        } />
        <Route path="/Student/student" element={<Student />} />
        <Route path="/Order/order" element={<Order />} />
        <Route path="/Order/order-list" element={<OrderList />} />
        <Route path="/studentinfo" element={<StudentInfo />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/MenuItem/view-menu" element={<MainMenu />} />
        <Route path="/MenuItem/menuitemdetails" element={<MenuItemDetails />} />

        <Route path="/MenuItem/MenuitemAnalytics" element={<MenuItemAnalytics />} />

        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<MenuItemAnalytics />} />
        <Route path="/accountsettings" element={<AccountSettings />} />
        <Route path="/Feedback/feedback" element={<Feedback />} />
        <Route path="/Feedback/feedbacklist" element={<FeedbackList />} />
        <Route path="/stock" element={<StockOverview />} />
        <Route path="/MenuItem/view-unavailable" element={<ViewUnavailableMenuItems />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        {/* <Route path="/mainmenu" element={<MainMenu/>}/> */}
        {/* <Route path="/ordermenu" element={<MenuOrder/>}/> */}
      </Routes>
    </div>
  );
};

// Add this component for protected routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/Staff/staff" />;
};

export default App;
