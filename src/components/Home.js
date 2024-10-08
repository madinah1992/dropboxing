// src/components/Home.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Profile from './Profile';
import Feed from './Feed'; // Import Feed component
import './Home.css'; // Custom CSS for layout
import ProfileEdit from './ProfileEdit';

const Home = () => {
  const location = useLocation(); // Hook to get current location

  return (
    <div className="home-container">
      
      
      <div className="main-content">
        {/* Top Bar */}
        <TopBar />

        {/* Conditionally render the Feed component only on specific routes */}
        {location.pathname === '/' && (
          <div className="feed-section">
            <Feed />
          </div>
        )}

        {/* Content Routes for other components */}
        <div className="content">
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
