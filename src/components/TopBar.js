// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { auth } from '../firebase'; // Adjust the path to your firebase configuration file
import './TopBar.css'; // For styling

const TopBar = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("You have been logged out successfully.");
      // Optionally, you can redirect to the login page or homepage after logging out
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="topbar">
      <div className="left-section">
        <input type="text" placeholder="Search" className="search-bar" />
      </div>

      <div className="right-section">
        <button className="icon-button">What's New</button>
        <button className="icon-button">Notifications</button>
        
        {/* Profile Link Button */}
        <Link to="/profile" className="icon-button">Profile</Link> {/* Link to Profile component */}

        <button className="icon-button">Account</button>

        {/* Logout Button */}
        <button className="icon-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default TopBar;
