import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffDashboard = () => {
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/Staff/staff');
          return;
        }

        const response = await axios.get('http://localhost:8080/staffauth/all', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Debug logs
        console.log('Raw response:', response);
        console.log('Staff data:', response.data);
        
        // Check if response.data is an array, if not try to extract the array
        let staffData = response.data;
        if (!Array.isArray(staffData) && staffData.data) {
          staffData = staffData.data;
        }

        // Ensure we're working with an array and map the data correctly
        const processedStaffData = Array.isArray(staffData) ? staffData : [];
        console.log('Processed staff data:', processedStaffData);

        setStaffList(processedStaffData);
        setError('');
      } catch (error) {
        console.error('Full error:', error);
        console.error('Error response:', error.response);
        setError(
          error.response?.data?.message || 
          'Failed to fetch staff list. Please check your authorization.'
        );
        if (error.response?.status === 403 || error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/Staff/staff');
        }
      }
    };

    fetchStaffList();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Staff/staff');
  };

  const handleBackToMenu = () => {
    navigate('/MenuItem/menuitem');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Staff Dashboard
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Staff List
              </Typography>
              {staffList && staffList.length > 0 ? (
                staffList.map((staff, index) => (
                  <Box key={staff.id || staff.staffId || index} mb={2}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Typography variant="h6">{staff.username || staff.name || 'N/A'}</Typography>
                      <Typography>Role: {staff.role || staff.userRole || 'N/A'}</Typography><br />
                      <Typography>Email: {staff.email || 'N/A'}</Typography><br />
                      <Typography>Contact: {staff.contactNumber || staff.contact || 'N/A'}</Typography><br />
                      {staff.schedule && (
                        <Typography>
                          Schedule: {new Date(staff.schedule).toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">
                  {error ? `Error: ${error}` : 'No staff members found.'}
                </Typography>
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
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleBackToMenu}
                >
                  Back to Menu
                </Button>
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