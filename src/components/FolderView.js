// src/components/FolderView.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const FolderView = ({ currentPath, onFolderChange }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'folders', currentPath)); // Fetch folders based on current path
        const folderData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFolders(folderData);
      } catch (err) {
        console.error(err);
        setError('Failed to load folders');
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [currentPath]);

  const handleFolderClick = (folderId) => {
    // Logic to navigate to the selected folder
    onFolderChange(folderId); // Update the current path in parent component
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Folders</h1>
      <ul>
        {folders.map(folder => (
          <li key={folder.id} onClick={() => handleFolderClick(folder.id)}>
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderView;
