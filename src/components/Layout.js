// src/components/Layout.js
import React from 'react';
import './Layout.css'; // We'll add CSS styling for the layout

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="left-bar">
        <h2>Left Sidebar</h2>
        <ul>
          <li><a href="/all-files">All Files</a></li>
          <li><a href="/photos">Photos</a></li>
          <li><a href="/shared">Shared</a></li>
          <li><a href="/signatures">Signatures</a></li>
          <li><a href="/less">Less</a></li>
          <li><a href="/file-requests">File Requests</a></li>
          <li><a href="/deleted-files">Deleted Files</a></li>
          <li><a href="/folders">Folders</a></li>
        </ul>
      </div>
      <div className="top-bar">
        <h2>Top Bar</h2>
        {/* You can add more top bar content here like profile, notifications, etc. */}
      </div>
      <div className="content">
        {children} {/* This will render whatever child component is passed */}
      </div>
    </div>
  );
};

export default Layout;
