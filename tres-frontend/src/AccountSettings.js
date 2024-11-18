import React, { useState } from 'react';
import './App.css';

const AccountSettings = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    preferences: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form (you can handle the submission to API here)
    console.log('Form Submitted', formData);
    alert('Account settings updated successfully!');
  };

  return (
    <div className="account-settings-page">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit} className="account-settings-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a new password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferences">Preferences</label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Enter your preferences"
          />
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;
