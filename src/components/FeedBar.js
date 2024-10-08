// src/components/FeedBar.js
import React from 'react';
import './FeedBar.css'; // Import your custom CSS file

const FeedBar = () => {
  return (
    <div className="feedbar-container">
      <div className="feedbar-item">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="feedbar-item">
        <button className="feedbar-icon">Invite</button>
      </div>
      <div className="feedbar-item">
        <button className="feedbar-icon">Explore Apps</button>
      </div>
      <div className="feedbar-item">
        <button className="feedbar-icon">Get Dropbox</button>
      </div>
      <div className="feedbar-item">
        <button className="feedbar-icon">What's New</button>
      </div>
      <div className="feedbar-item">
        <button className="feedbar-icon">Notifications</button>
      </div>
      <div className="feedbar-item">
        <button className="feedbar-icon">Account</button>
      </div>
      <div className="feedbar-item">
        <button className="upgrade-button">Click to Upgrade</button>
      </div>
    </div>
  );
};

export default FeedBar;
