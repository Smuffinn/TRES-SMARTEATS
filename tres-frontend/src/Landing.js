import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from './white_background.png';
import './App.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/choose-role');
  };

  return (
    <div className="landing-container">
      <img 
        src={logo1} 
        alt="CITU - SMART EATS Logo" 
        className="landing-logo" 
        onClick={handleClick} 
        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto', objectFit: 'contain' }} // Adjust as needed
      />
    </div>
  );
};

export default Landing;
