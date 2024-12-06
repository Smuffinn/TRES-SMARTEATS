import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Rating,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import './Feedback.css';
import './App.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        rating: 5,
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/feedback/add', feedback);
            setOpenSnackbar(true);
            setLoading(false);
            
            // Clear form and navigate after short delay
            setTimeout(() => {
                setFeedback({
                    firstName: '',
                    lastName: '',
                    email: '',
                    message: '',
                    rating: 5,
                });
                navigate('/'); // Navigate to feedback list
            }, 2000); // Increased delay to show success message
        } catch (error) {
            setLoading(false);
            alert('Error submitting feedback!');
            console.error(error);
        }
    };

    return (
        <Container maxWidth="md" sx={{
            py: 8,
            px: { xs: 2, sm: 4, md: 6 },
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%' }}
            >
                <Paper elevation={6} sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}>
                    <Box className="form-header" sx={{ textAlign: 'center' }}>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <FeedbackIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                        </motion.div>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                            Share Your Experience
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                            We value your feedback to improve our services
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit} className="feedback-form">
                        <Stack spacing={5} sx={{ alignItems: 'center', width: '100%' }}>
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 4, 
                                flexDirection: { xs: 'column', md: 'row' },
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <TextField
                                    className="form-field"
                                    label="First Name"
                                    name="firstName"
                                    value={feedback.firstName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    helperText="Enter your first name"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                        width: { xs: '100%', md: '45%' },
                                        maxWidth: '400px'
                                    }}
                                />
                                <TextField
                                    className="form-field"
                                    label="Last Name"
                                    name="lastName"
                                    value={feedback.lastName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    helperText="Enter your last name"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                        width: { xs: '100%', md: '45%' },
                                        maxWidth: '400px'
                                    }}
                                />
                            </Box>
                            
                            <TextField
                                className="form-field"
                                label="Email"
                                name="email"
                                value={feedback.email}
                                onChange={handleInputChange}
                                type="email"
                                fullWidth
                                required
                                variant="outlined"
                                helperText="We'll never share your email"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                    width: '100%',
                                    maxWidth: '800px'
                                }}
                            />

                            <Box className="rating-section" sx={{ 
                                textAlign: 'center',
                                width: '100%',
                                maxWidth: '800px',
                                py: 3,
                                my: 2,
                                backgroundColor: 'rgba(0,0,0,0.02)',
                                borderRadius: 2
                            }}>
                                <Typography component="legend" sx={{ mb: 1, fontWeight: 500 }}>
                                    How would you rate your experience?
                                </Typography>
                                <Rating
                                    name="rating"
                                    value={feedback.rating}
                                    onChange={(event, newValue) => {
                                        setFeedback({ ...feedback, rating: newValue });
                                    }}
                                    size="large"
                                    sx={{
                                        fontSize: '2rem',
                                        '& .MuiRating-iconFilled': {
                                            color: '#ffd700',
                                        }
                                    }}
                                />
                            </Box>

                            <TextField
                                className="message-field"
                                label="Your Message"
                                name="message"
                                value={feedback.message}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                fullWidth
                                required
                                variant="outlined"
                                helperText="Tell us what you think"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                    width: '100%',
                                    maxWidth: '800px'
                                }}
                            />

                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }} 
                                spacing={3} 
                                justifyContent="center" 
                                className="button-group"
                                sx={{ width: '100%', pt: 3 }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        minWidth: 150,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        py: 1.5,
                                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                                        }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
                                </Button>
                                {/* <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    sx={{ minWidth: 150, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem', py: 1.5 }}
                                    onClick={() => navigate('/Feedback/feedbacklist')}
                                >
                                    View Feedbacks
                                </Button> */}
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </motion.div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="success" 
                    sx={{ 
                        width: '100%',
                        borderRadius: 2,
                        fontSize: '1.1rem'
                    }}
                >
                    Thank you for your feedback!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Feedback;
