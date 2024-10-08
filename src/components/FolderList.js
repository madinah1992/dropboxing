// src/components/FolderList.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const FolderList = ({ parentFolderId = null }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('Please log in to view folders.');
        return;
      }

      try {
        const folderRef = collection(db, `users/${user.uid}/folders`);
        const q = query(folderRef, where('parentFolder', '==', parentFolderId));
        const snapshot = await getDocs(q);
        const fetchedFolders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFolders(fetchedFolders);
      } catch (error) {
        console.error('Error fetching folders: ', error);
      }
    };

    fetchFolders();
  }, [parentFolderId]);

  return (
    <div>
      <h2>Folders</h2>
      {folders.length > 0 ? (
        folders.map((folder) => (
          <div key={folder.id}>
            <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
          </div>
        ))
      ) : (
        <p>No folders found.</p>
      )}
    </div>
  );
};

export default FolderList;
