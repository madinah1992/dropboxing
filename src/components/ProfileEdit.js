// src/components/ProfileEdit.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure you have Firebase initialized
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthProvider';

const ProfileEdit = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({ displayName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success message

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.error('No such document!');
          setError('No user data found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userData.displayName) {
      setError('Display Name cannot be empty');
      return;
    }

    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, { displayName: userData.displayName }); // Update only the displayName
      setSuccessMessage('Profile updated successfully!'); // Set success message
      setError(''); // Clear any previous error
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Show success message */}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Display Name:</label>
          <input 
            type="text" 
            value={userData.displayName} 
            onChange={(e) => setUserData({ ...userData, displayName: e.target.value })} 
            required // Make this field required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={userData.email} 
            readOnly 
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
