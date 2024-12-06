import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffDashboard = () => {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging log
        if (!token) {
          navigate('/Staff/staff');
          return;
        }

        const response = await axios.get('http://localhost:8080/staffauth/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response:', response.data); // Debugging log
        setStaffList(response.data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
        navigate('/Staff/staff');
      }
    };

    fetchStaffList();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Staff/staff');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Staff Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Staff List
              </Typography>
              {staffList.length > 0 ? (
                staffList.map((staff) => (
                  <Box key={staff.staffId} mb={2}>
                    <Typography>Name: {staff.name}</Typography>
                    <Typography>Role: {staff.role}</Typography>
                    <Typography>Email: {staff.email}</Typography>
                    <Typography>Contact: {staff.contactNumber}</Typography>
                    <Typography>Schedule: {new Date(staff.schedule).toLocaleString()}</Typography>
                  </Box>
                ))
              ) : (
                <Typography>No staff members found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDashboard;