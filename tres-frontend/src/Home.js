// src/Home.js
import React from 'react';
import './App.css'; 

const Home = () => {
    return (

        <div className="container">
            <h1>Welcome to the SMART EATS!</h1>

            <p>This is your home page. From here, you can navigate to the login or registration pages.</p>
            <a href="/login" className="button">Login</a>
            <a href="/register" className="button">Go to Register</a>
        </div>
    );
};

export default Home;
