import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import './App.css';

const StudentInfo = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    Stud_ID: '',
    Name: '',
    Grade_Level: '',
    Contact_Number: '',
    Email: ''
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate student information here if necessary
    if (student.Stud_ID && student.Name && student.Grade_Level && student.Contact_Number && student.Email) {
      navigate('/view-menu', { state: { student } });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container">
      <h1>ENTER STUDENT INFROMATION</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(student).map((key) => (
          <TextField
            key={key}
            label={key.replace('_', ' ')}
            name={key}
            value={student[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        ))}
        <div className="button-container">
          <button type="submit" variant="contained" color="primary" className="submit-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentInfo;
