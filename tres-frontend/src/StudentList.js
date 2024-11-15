import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  Box, Typography } from '@mui/material';
import './App.css';

const StudentList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get student data from the location state
  const { student } = location.state || { student: null };

  // Handle back navigation
  const handleBack = () => {
    navigate('/student');
  };

  // Handle view all action (implement this function as needed)
  const handleViewAll = () => {
    // Navigate to another route or implement functionality to view all students
    console.log("View all information functionality to be implemented");
  };

  return (
    <Box>
      {student ? (
        <div className="menu-container">
          <h1>Student List</h1>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Grade Level</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{student.Stud_ID}</td>
                <td>{student.Name}</td>
                <td>{student.Grade_Level}</td>
                <td>{student.Contact_Number}</td>
                <td>{student.Email}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => console.log('Edit Student')}>Edit</button>
                    <button onClick={() => console.log('Delete Student')} className="delete-button">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 2, textAlign: 'center'
        }}>No student information available.</Typography>
      )}
      <div className="button-container" style={{ marginTop: 16 }}>
        <button variant="contained" color="primary" onClick={handleBack} sx={{ marginRight: 2 }}>
          Back
        </button>
        <button variant="contained" color="secondary" onClick={handleViewAll}>
          View All Information
        </button>
      </div>
    </Box>
  );
};

export default StudentList;
