import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import './App.css'; // Import CSS file

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });
    
            console.log('Response:', response); // Log the response object
            console.log('Response Status:', response.status); // Log the response status
    
            if (!response.ok) {
                const errorMessage = await response.text();
                toast.error(errorMessage); // Show error toast
                return;
            }
    
            const result = await response.text(); // Get success message
            toast.success(result); // Show success toast
            setTimeout(() => {
                navigate('/home'); // Redirect to home after a brief delay
            }, 2000); // Delay for 2 seconds
        } catch (err) {
            console.error('Error:', err);
            toast.error('An error occurred while logging in. Please try again.');
        }
    };
    

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    label="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div className="link">
                Don't have an account? <a href="/register">Register</a>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default Login;
