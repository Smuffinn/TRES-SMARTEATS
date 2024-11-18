import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@mui/material';
import './App.css';

const Student = () => {
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

    if (student.Stud_ID && student.Name && student.Grade_Level && student.Contact_Number && student.Email) {
      // Navigate to StudentList.js with the student data
      navigate('/studentlist', { state: { student } });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Box className="container">
      <h1>STUDENT INFROMATION</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(student).map((key) => (
          key === "Grade_Level" ? (
            <FormControl fullWidth margin="normal" variant="outlined" key={key}>
              <InputLabel id="grade-level-label">Grade Level</InputLabel>
              <Select
                labelId="grade-level-label"
                name={key}
                value={student[key]}
                onChange={handleChange}
                label="Grade Level"
                MenuProps={{
                  PaperProps: {
                      sx: {
                          textAlign: 'left', // Ensure options are left-aligned
                      },
                  },
              }}
              sx={{ textAlign: 'left' }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Freshman">Freshman</MenuItem>
                <MenuItem value="Sophomore">Sophomore</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
          ) : (
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
          )
        ))}
        <div className="button-container">
          <button type="submit" variant="contained" color="primary" className="submit-button">
            Save
          </button>
        </div>
      </form>
    </Box>
  );
};

export default Student;
