import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css';

const FeedbackList = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [editingFeedback, setEditingFeedback] = useState(null);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/feedback/getAll');
            setFeedbackList(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/feedback/delete/${id}`);
            alert('Feedback deleted successfully!');
            fetchFeedbacks();
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleEdit = (feedback) => {
        setEditingFeedback(feedback);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/feedback/update/${editingFeedback.feedbackId}`, editingFeedback);
            alert('Feedback updated successfully!');
            setEditingFeedback(null);
            fetchFeedbacks();
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingFeedback({ ...editingFeedback, [name]: value });
    };

    const handleCloseEditForm = () => {
        setEditingFeedback(null); // Close the edit form by setting editingFeedback to null
    };

    return (
        <div className="container">
            <h1>View Feedback</h1>
            <ul>
                {feedbackList.map((feedback) => (
                    <li key={feedback.feedbackId}>
                        <p>
                            <strong>Name:</strong> {feedback.firstName} {feedback.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {feedback.email}
                        </p>
                        <p>
                            <strong>Message:</strong> {feedback.message}
                        </p>
                        <button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(feedback.feedbackId)}
                        >
                            Delete
                        </button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(feedback)}
                        >
                            Edit
                        </Button>
                    </li>
                ))}
            </ul>

            {editingFeedback && (
                <div>
                    <h2>Edit Feedback</h2>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={editingFeedback.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={editingFeedback.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editingFeedback.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={editingFeedback.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                    />
                    <button onClick={handleCloseEditForm}>
                        Close
                    </button>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                    
                </div>
            )}
        </div>
    );
};

export default FeedbackList;
