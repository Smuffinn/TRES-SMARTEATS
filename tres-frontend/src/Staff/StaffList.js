import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StaffList.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/staff/getStaff');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const editStaff = (staff) => {
    navigate('/Staff/staff', { state: { staff } });
  };

  const deleteStaff = async (staffId) => {
    try {
      await axios.delete(`http://localhost:8080/api/staff/deleteStaff/${staffId}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <div className="staff-list-container">
      <h1>Staff List</h1>
      <table className="staff-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Contact Number</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(member => (
            <tr key={member.staffId}>
              <td>{member.staffId}</td>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.contactNumber}</td>
              <td>{member.schedule}</td>
              <td>
                <button onClick={() => editStaff(member)}>Edit</button>
                <button onClick={() => deleteStaff(member.staffId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
