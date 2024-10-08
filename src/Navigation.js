// src/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthProvider';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/files">Your Files</Link></li>
        {currentUser ? (
          <li><button onClick={() => auth.signOut()}>Sign Out</button></li>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
