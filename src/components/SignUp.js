// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Adjust to include Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // New state for display name
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName: displayName, // Save the display name
        email: email, // Save the email
      });

      console.log('Sign up successful. Redirecting to home page...');
      navigate('/'); // Redirect to home page after successful sign up
    } catch (error) {
      console.error("Error signing up: ", error);
      setError(error.message); // Set error message to display
    }
  };

  return (
    <div className="auth-container">
      <img src="../assets/dropbox-logo.png" alt="Dropbox Logo" className="logo" />
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Display Name" // New input field for display name
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default SignUp;
