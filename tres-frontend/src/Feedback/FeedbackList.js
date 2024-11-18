import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FeedbackList.css';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

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

  const editFeedback = (feedback) => {
    navigate('/Feedback/feedback', { state: { feedback } });
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:8080/feedback/delete/${feedbackId}`);
      fetchFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const getRandomColor = () => {
    const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#F5F5F5', '#CFD8DC'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="feedback-list-container">
      <h1>Feedback List</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th className="header-cell">Feedback ID</th>
            <th className="header-cell">Name</th>
            <th className="header-cell">Email</th>
            <th className="header-cell">Message</th>
            <th className="header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map(feedback => (
            <tr key={feedback.feedbackId} style={{ backgroundColor: getRandomColor() }}>
              <td>{feedback.feedbackId}</td>
              <td>{feedback.firstName} {feedback.lastName}</td>
              <td>{feedback.email}</td>
              <td>{feedback.message}</td>
              <td>
                <button onClick={() => editFeedback(feedback)}>Edit</button>
                <button onClick={() => deleteFeedback(feedback.feedbackId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
