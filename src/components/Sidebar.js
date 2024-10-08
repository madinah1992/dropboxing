// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Optional CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>My Files</h2>
      <ul>
        <li>
          <NavLink to="/all-files" activeClassName="active-link">All Files</NavLink>
        </li>
        <li>
          <NavLink to="/photos" activeClassName="active-link">Photos</NavLink>
        </li>
        <li>
          <NavLink to="/shared" activeClassName="active-link">Shared Files</NavLink>
        </li>
        <li>
          <NavLink to="/signatures" activeClassName="active-link">Signatures</NavLink>
        </li>
        <li>
          <NavLink to="/file-requests" activeClassName="active-link">File Requests</NavLink>
        </li>
        <li>
          <NavLink to="/deleted-files" activeClassName="active-link">Deleted Files</NavLink>
        </li>
        <li>
          <NavLink to="/folders" activeClassName="active-link">Folders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
