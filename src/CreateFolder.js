// src/CreateFolder.js
import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreateFolder = () => {
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = async () => {
    if (folderName) {
      try {
        const folderRef = doc(db, 'folders', folderName);
        await setDoc(folderRef, { name: folderName });
        setFolderName('');
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create Folder</h2>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Enter folder name"
      />
      <button onClick={handleCreateFolder}>Create Folder</button>
    </div>
  );
};

export default CreateFolder;
