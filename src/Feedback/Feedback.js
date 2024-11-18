import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });
    const navigate = useNavigate(); // Hook for navigation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/feedback/add', feedback);
            alert('Feedback submitted successfully!');
            setFeedback({
                firstName: '',
                lastName: '',
                email: '',
                message: '',
            });
        } catch (error) {
            alert('Error submitting feedback!');
            console.error(error);
        }
    };

    const navigateToFeedbackList = () => {
        navigate('/Feedback/feedbacklist'); // Navigate to the feedback list page
    };

    return (
        <div className="container">
            <h1>Feedback Form</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={feedback.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={feedback.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={feedback.email}
                    onChange={handleInputChange}
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Message"
                    name="message"
                    value={feedback.message}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    required
                />
                <button type="submit" variant="contained" color="primary">
                    Submit Feedback
                </button>
                <button
                    variant="contained"
                    color="primary"
                    onClick={navigateToFeedbackList}
                >
                    View Feedback List
                </button>
            </form>
        </div>
    );
};

export default Feedback;
