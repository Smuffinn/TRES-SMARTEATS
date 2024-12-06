import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography, Button, Tab, Tabs } from '@mui/material';
import './Staff.css';

const Staff = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    id: '', // Added id field
    email: '',
    password: '',
    name: '',
    role: '',
    contactNumber: '',
    schedule: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/staffauth/login', {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/MenuItem/menuitem');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/staffauth/register', formData, {
        headers: {
          'Accept': 'application/json'
        }
      });
      setActiveTab(0);
      setError('Registration successful. Please login.');
      navigate('/MenuItem/menuitem');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="staff-container">
      <Typography className="staff-title" variant="h4" gutterBottom>
        Staff Portal
      </Typography>
      
      <Box className="staff-tabs">
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          TabIndicatorProps={{
            style: { backgroundColor: '#8b0000' }
          }}
        >
          <Tab label="Login" sx={{ fontWeight: 'bold' }} />
          <Tab label="Register New Staff" sx={{ fontWeight: 'bold' }} />
        </Tabs>
      </Box>

      {error && (
        <div className={error.includes('successful') ? 'success-message' : 'error-message'}>
          {error}
        </div>
      )}

      {activeTab === 0 ? (
        <form onSubmit={handleLogin} className="staff-form form-animate">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              className="form-field"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              className="form-field"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            <Button 
              className="submit-button"
              type="submit" 
              variant="contained" 
              fullWidth
            >
              Login
            </Button>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="staff-form form-animate">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              className="form-field"
              name="id"
              label="ID"
              value={formData.id}
              onChange={handleChange}
              required
            />
            <TextField
              className="form-field"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              className="form-field"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              className="form-field"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              className="form-field"
              name="role"
              label="Role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <TextField
              className="form-field"
              name="contactNumber"
              label="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <TextField
              className="form-field"
              name="schedule"
              label="Schedule"
              type="datetime-local"
              value={formData.schedule}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <Button 
              className="submit-button"
              type="submit" 
              variant="contained" 
              fullWidth
            >
              Register
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Staff;