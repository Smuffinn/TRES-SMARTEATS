// StaffList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffList.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/staff/getStaff'); // Ensure correct endpoint
        console.log('API Response:', response.data); // Debug: Log the API response
        setStaff(response.data);
      } catch (error) {
        setError('Error fetching staff data');
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return <div className="staff-list-container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="staff-list-container"><p>{error}</p></div>;
  }

  return (
    <div className="staff-list-container">
      <h1>Staff List</h1>
      {staff.length > 0 ? (
        staff.map(member => (
          <div key={member.staffId} className="staff-item">
            <p>Staff ID: {member.staffId}</p>
            <p>Name: {member.name}</p>
            <p>Role: {member.role}</p>
            <p>Contact Number: {member.contactNumber}</p>
            <p>Schedule: {member.schedule}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No staff members found.</p>
      )}
    </div>
  );
};

export default StaffList;
