import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import './App.css'; // Import CSS file

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        // Simulate a login request (replace this with real backend logic later)
        setTimeout(() => {
            setLoading(false);  // Set loading state to false after the timeout

            // Simulated login success or failure (you can adjust this)
            if (formData.username === 'user' && formData.password === 'password') {
                toast.success('Login successful!'); // Show success toast
                setTimeout(() => {
                    navigate('/home'); // Redirect to home after a brief delay
                }, 2000); // Delay for 2 seconds
            } else {
                // toast.error('Invalid username or password. Please try again.');
                toast.success('Login successful!'); // Show success toast
                setTimeout(() => {
                    navigate('/home'); // Redirect to home after a brief delay
                }, 2000); 
            }
        }, 2000); // Simulate network delay
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
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
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <div className="link">
                Don't have an account? <a href="/register">Register</a>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default Login;
