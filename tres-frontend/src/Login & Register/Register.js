import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import CSS file

const Registration = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        role: '', 
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true); // Set loading state to true

        if (!formData.role) {
            setError('Please select a role.');
            setLoading(false);
            return;
        }

        // Simulate successful registration after form submission
        setTimeout(() => {
            setLoading(false);
            setSuccess("Registration successful!");
            alert("User registered successfully!");
            navigate('/login');  // Redirect to login after successful registration
        }, 2000); // Simulate 2 seconds delay for the registration process
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
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Role</option>
                    <option value="Staff">Staff</option>
                    <option value="Customer">Customer</option>
                </select>
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
                        type={showPassword ? "text" : "password"}
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
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Hide" : "Show"} Password
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <div className="link">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    );
};

export default Registration;
