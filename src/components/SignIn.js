// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { auth } from '../firebase'; // Adjust if using Firebase or another authentication service
import { signInWithEmailAndPassword } from 'firebase/auth';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="auth-container">
      <img src="../assets/dropbox-logo.png" alt="Dropbox Logo" className="logo" />
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? 
        <Link to="/signup"> Create an account</Link> {/* Link to Sign Up */}
      </p>
    </div>
  );
};

export default SignIn;
