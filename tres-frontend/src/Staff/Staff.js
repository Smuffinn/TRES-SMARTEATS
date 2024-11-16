import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Box, TextField } from '@mui/material';

const Staff = () => {
  const [staffDetails, setStaffDetails] = useState({
    Staff_ID: '',
    Name: '',
    Role: '',
    Contact_Number: '',
    Schedule: ''
  });
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle input changes for the staff form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({
      ...staffDetails,
      [name]: value
    });
  };
  const handleViewList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/staff'); // Adjust the URL based on your backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStaff(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new staff member (POST request)
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/staff', staffDetails); // Replace with your actual API URL
      console.log('Staff member created successfully:', response.data);
      alert('Staff member created successfully!');
      navigate('/staff-success');  // Navigate to a success page (optional)
    } catch (error) {
      console.error('Error creating staff member:', error);
      alert('Error creating staff member. Please try again.');
    }
  };

  // Update an existing staff member by ID (PUT request)
  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const staffId = staffDetails.Staff_ID;
    try {
      const response = await axios.put(`http://localhost:8080/api/staff/${staffId}`, staffDetails);
      console.log('Staff member updated successfully:', response.data);
      alert('Staff member updated successfully!');
      navigate('/staff-update-success');  // Navigate to a success page (optional)
    } catch (error) {
      console.error('Error updating staff member:', error);
      alert('Error updating staff member. Please try again.');
    }
  };

  // Delete a staff member by ID (DELETE request)
  const handleDeleteStaff = async () => {
    const staffId = staffDetails.Staff_ID;
    try {
      const response = await axios.delete(`http://localhost:8080/api/staff/${staffId}`);
      console.log('Staff member deleted successfully:', response.data);
      alert('Staff member deleted successfully!');
      setStaffDetails({
        Staff_ID: '',
        Name: '',
        Role: '',
        Contact_Number: '',
        Schedule: ''
      }); // Clear form after deletion
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert('Error deleting staff member. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>STAFF</h1>
      <form onSubmit={handleCreateStaff}>
        
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <TextField
        label="Name"
        id="Name"
        name="Name"
        placeholder="Name"
        value={staffDetails.Name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Role"
        id="Role"
        name="Role"
        placeholder="Role"
        value={staffDetails.Role}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Contact Number"
        id="Contact_Number"
        name="Contact_Number"
        placeholder="Contact Number"
        value={staffDetails.Contact_Number}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Schedule"
        id="Schedule"
        name="Schedule"
        placeholder="Schedule"
        value={staffDetails.Schedule}
        onChange={handleChange}
        fullWidth
        required
      />
    </Box>

        <button type="submit">Create Staff</button>
        <button type="button" onClick={handleViewList}>View Staff List</button>
        <button type="button" onClick={handleUpdateStaff}>
          Update Staff
        </button>
        <button type="button" onClick={handleDeleteStaff}>
          Delete Staff
        </button>
      </form>
    </div>
  );
};

export default Staff;