import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Box, TextField, Button } from '@mui/material';

const Staff = ({ staffData, setStaffData }) => {
  const [staffDetails, setStaffDetails] = useState({
    staffId: '',
    name: '',
    role: '',
    contactNumber: '',
    schedule: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize any necessary state or perform any setup actions here
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({
      ...staffDetails,
      [name]: value
    });
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Creating staff with details:', staffDetails); // Log staff details
    try {
      const response = await axios.post('http://localhost:8080/api/staff/postStaff', staffDetails, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          staffId: staffDetails.staffId,
          name: staffDetails.name,
          role: staffDetails.role,
          contactNumber: staffDetails.contactNumber,
          schedule: staffDetails.schedule
        })
      });
      console.log('Staff created successfully:', response.data);
      alert('Staff member created successfully!');
      setStaffData((prevData) => [...prevData, response.data]);
      //navigate('/staff-list');
    } finally {
      setLoading(false);
    }
  };

  const handleViewStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/staff/getStaff');
      setStaffData(response.data);
     // navigate('/staff-list'); 
    } catch (error) {
      console.error('Failed to load staff data:', error.response ? error.response.data : error.message);
      alert('Failed to load staff data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const staffId = staffDetails.staffId;
    setLoading(true);
    console.log('Updating staff with details:', staffDetails); // Log staff details
    try {
      const response = await axios.put(`http://localhost:8080/api/staff/putStaff/${staffId}`, staffDetails, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          staffId: staffDetails.staffId,
          name: staffDetails.name,
          role: staffDetails.role,
          contactNumber: staffDetails.contactNumber,
          schedule: staffDetails.schedule
        })
      });
      console.log('Staff member updated successfully:', response.data);
      alert('Staff member updated successfully!');
      setStaffData((prevData) => prevData.map(staff => staff.staffId === staffId ? response.data : staff));
      navigate('/staff-list');
    } catch (error) {
      console.error('Error updating staff member:', error.response ? error.response.data : error.message);
      alert('Error updating staff member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStaff = async () => {
    const staffId = staffDetails.staffId;
    setLoading(true);
    console.log('Deleting staff with ID:', staffId); // Log staff ID
    try {
      const response = await axios.delete(`http://localhost:8080/api/staff/deleteStaff/${staffId}`);
      console.log('Staff member deleted successfully');
      alert('Staff member deleted successfully!');
      setStaffDetails({
        staffId: '',
        name: '',
        role: '',
        contactNumber: '',
        schedule: ''
      });
      setStaffData((prevData) => prevData.filter(staff => staff.staffId !== staffId));
    } catch (error) {
      console.error('Error deleting staff member:', error.response ? error.response.data : error.message);
      alert('Error deleting staff member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>STAFF</h1>
      <form onSubmit={handleCreateStaff}>
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
        <button type="submit">Create Staff</button>
        <button type="button" onClick={handleViewStaff}>View Staff List</button>
        <button type="button" onClick={handleUpdateStaff}>Update Staff</button>
        <button type="button" onClick={handleDeleteStaff}>Delete Staff</button>
      </form>

      {loading && <p>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Contact Number</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.staffId}>
              <td>{staff.staffId}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.contactNumber}</td>
              <td>{staff.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;