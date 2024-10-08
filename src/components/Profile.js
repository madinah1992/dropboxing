// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure you have Firebase initialized
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthProvider'; // Custom hook to use Auth context
import { Link } from 'react-router-dom'; // Import Link for navigation

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({ displayName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        const userDoc = doc(db, 'users', currentUser.uid); // Assuming user data is stored in the 'users' collection
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('No user data found');
        }
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p><strong>Display Name:</strong> {userData.displayName}</p>
      <p><strong>Email:</strong> {userData.email}</p>

      {/* Link to edit profile */}
      <Link to="/profile/edit">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
};

export default Profile;
