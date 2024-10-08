// src/components/FolderCreation.js
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FolderCreation = ({ parentFolderId = null }) => {
  const [folderName, setFolderName] = useState('');

  const createFolder = async () => {
    if (!folderName) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please log in to create folders.');
        return;
      }

      const folderRef = collection(db, `users/${user.uid}/folders`);
      await addDoc(folderRef, {
        name: folderName,
        parentFolder: parentFolderId,
        createdAt: serverTimestamp(),
      });

      setFolderName('');
      alert('Folder created successfully!');
    } catch (error) {
      console.error('Error creating folder: ', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Enter folder name"
      />
      <button onClick={createFolder}>Create Folder</button>
    </div>
  );
};

export default FolderCreation;
