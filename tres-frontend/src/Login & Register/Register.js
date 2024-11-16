import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import CSS file

const Registration = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccess(''); // Reset success message

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the response is not OK and handle error accordingly
            if (!response.ok) {
                const errorMessage = await response.json(); // Use .json() for JSON responses
                setError(errorMessage.message || "Registration failed!"); // Set the error message
                return;
            }

            const result = await response.json(); // Use .json() to parse the success response
            setSuccess(result.message || "Registration successful!"); // Set the success message

            // Show alert for successful registration
            alert("User registered successfully!"); // Show pop-up message

            navigate('/home'); // Redirect to home after successful registration
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while registering. Please try again.'); // Handle any other errors
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="show-password-button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                    {showPassword ? "Hide" : "Show"} Password
                </button>
                <button type="submit">Register</button>
            </form>
            <div className="link">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    );
};

export default Registration;
