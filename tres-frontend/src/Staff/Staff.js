import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Box, TextField } from '@mui/material';

const Staff = () => {
  const [staffDetails, setStaffDetails] = useState({
    staffId: '',
    name: '',
    role: '',
    contactNumber: '',
    schedule: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.staff) {
      setStaffDetails(location.state.staff);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({
      ...staffDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (staffDetails.staffId) {
        await axios.put(`http://localhost:8080/api/staff/putStaff/${staffDetails.staffId}`, staffDetails);
      } else {
        await axios.post('http://localhost:8080/api/staff/postStaff', staffDetails);
      }
      navigate('/staff-list');
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  return (
    <div className="container">
      <h1>STAFF</h1>
      <form onSubmit={handleSubmit}>
        <Box spacing={2} display="flex" flexDirection="column">
          <TextField
            type="text"
            id="staffId"
            name="staffId"
            placeholder="Staff ID"
            value={staffDetails.staffId}
            onChange={handleChange}
          />
          <TextField
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={staffDetails.name}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            id="role"
            name="role"
            placeholder="Role"
            value={staffDetails.role}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Contact Number"
            value={staffDetails.contactNumber}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            id="schedule"
            name="schedule"
            placeholder="Schedule"
            value={staffDetails.schedule}
            onChange={handleChange}
            required
          />
        </Box>
        <button type="submit">
          {staffDetails.staffId ? 'Update Staff' : 'Add Staff'}
        </button>
        <button type="button" onClick={() => navigate('/Staff/staff-list')}>
          Staff List
        </button>
      </form>
    </div>
  );
};

export default Staff;