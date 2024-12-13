import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Button,
  Chip,
  Card,
  CardContent,
  IconButton,
  Divider
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const MenuItemAnalytics = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tes/menu/getAllMenu')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching menu items:', error));
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/MenuItem/menuitem');
  };

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: '#f5f5f5', 
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        maxWidth: 1400, 
        mx: 'auto'
      }}>
        {/* Header Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mb: 3, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'white',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EqualizerIcon sx={{ fontSize: 40, mr: 2, color: '#8B0000' }} />
            <Typography variant="h4" sx={{ color: '#8B0000', fontWeight: 'bold' }}>
              Menu Analytics Dashboard
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              bgcolor: '#8B0000',
              '&:hover': {
                bgcolor: '#620000',
              }
            }}
          >
            Back to Menu
          </Button>
        </Paper>

        <Grid container spacing={3}>
          {/* Stock Overview Card */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <InventoryIcon sx={{ mr: 1, color: '#8B0000' }} />
                  <Typography variant="h6">Stock Overview</Typography>
                </Box>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {items.map((item, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: item.quantity <= 5 ? '#ffe6e6' : '#e6ffe6', 
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body1">
                        <strong>{item.item_name}</strong>: {item.quantity} units
                      </Typography>
                      <Chip
                        label={item.quantity <= 5 ? 'Low Stock' : 'In Stock'}
                        color={item.quantity <= 5 ? 'error' : 'success'}
                        size="small"
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Stock Trend Chart */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#8B0000' }} />
                  <Typography variant="h6">Stock Trends</Typography>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={[] /* Replace with actual data */}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="stock" stroke="#8B0000" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Selling Items */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <EqualizerIcon sx={{ mr: 1, color: '#8B0000' }} />
                  <Typography variant="h6">Stock Visualization</Typography>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={items}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="item_name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantity" fill="#8B0000" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Stock Alerts */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <NotificationsActiveIcon sx={{ mr: 1, color: '#8B0000' }} />
                  <Typography variant="h6">Stock Alerts</Typography>
                </Box>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {items.filter(item => item.quantity <= 5).map((item, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: '#fee', 
                        borderRadius: 1,
                        border: '1px solid #ffcdd2'
                      }}
                    >
                      <Typography color="error">
                        Alert: {item.item_name} is running low! ({item.quantity} units remaining)
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MenuItemAnalytics;
