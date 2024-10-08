import React, { useState, useEffect, useCallback } from 'react';
import { storage, db } from '../firebase';
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import './Feed.css';
import { uploadBytes } from 'firebase/storage';
import FileViewer from './FileViewer'; // Adjust the path if necessary
import { useAuth } from '../contexts/AuthProvider'; // Import the useAuth hook

const Feed = () => {
  const { currentUser } = useAuth();
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [fileToView, setFileToView] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentFolderFiles, setCurrentFolderFiles] = useState([]);
  const [expirationDate, setExpirationDate] = useState('');
  const [version, setVersion] = useState(1);
  const [showAddFiles, setShowAddFiles] = useState(false);
  
  const fetchUploadedFiles = useCallback(async () => {
    try {
      const response = await fetch('/api/files'); // Example API endpoint
      const data = await response.json();
      setUploadedFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []); // Dependencies of fetchUploadedFiles (if any)

  

  // UseEffect to call fetchUploadedFiles
  useEffect(() => {
    fetchUploadedFiles(); // Call the function defined above
  }, [fetchUploadedFiles]); // Include fetchUploadedFiles in the dependencies

  // useEffect(() => {
  //   fetchFolders();
  //   if (currentUser) {
  //     fetchUploadedFiles();
  //   }
  // }, [currentUser]);

  

  // const fetchUploadedFiles = async () => {
  //   try {
  //     const filesCollection = collection(db, 'files');
  //     const q = query(filesCollection, where('uploadedBy', '==', currentUser.uid));
  //     const snapshot = await getDocs(q);
  //     const filesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setUploadedFiles(filesList);
  //   } catch (error) {
  //     console.error("Error fetching uploaded files:", error);
  //   }
  // };

  const uploadFiles = async () => {
    const promises = selectedFiles.map(async (file) => {
      const fileRef = ref(storage, `files/${file.name}`);
      await uploadBytes(fileRef, file);

      const downloadURL = await getDownloadURL(fileRef);
      const fileDetails = {
        name: file.name,
        version: version,
        expiration: expirationDate,
        uploadedAt: new Date(),
        uploadedBy: currentUser?.uid,
        url: downloadURL
      };

      const filesCollection = collection(db, 'files');
      await addDoc(filesCollection, fileDetails);
      return fileDetails;
    });

    try {
      const uploadedFileDetails = await Promise.all(promises);
      alert("Files uploaded successfully!");
      setUploadedFiles([...uploadedFiles, ...uploadedFileDetails]);
      setSelectedFiles([]);
      setShowUploadOptions(false);
      if (currentFolder) {
        fetchCurrentFolderFiles(currentFolder.id);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const fetchCurrentFolderFiles = async (folderId) => {
    try {
      const filesCollection = collection(db, 'files');
      const q = query(filesCollection, where('folderId', '==', folderId));
      const snapshot = await getDocs(q);
      const filesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCurrentFolderFiles(filesList);
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };

  const createFolder = async () => {
    if (folderName.trim() !== '') {
      const newFolder = {
        name: folderName,
        createdAt: new Date(),
        createdBy: currentUser?.uid,
      };
      try {
        const foldersCollection = collection(db, 'folders');
        await addDoc(foldersCollection, newFolder);
        setFolders([...folders, newFolder]);
        setFolderName('');
        alert('Folder created successfully!');
      } catch (error) {
        console.error("Error creating folder:", error);
        alert('Failed to create folder. Please try again.');
      }
    } else {
      alert('Folder name cannot be empty.');
    }
  };

  const deleteFile = async (fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);
    try {
      await deleteObject(fileRef);
      alert("File deleted successfully!");
      setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  const openFile = (fileName) => {
    setFileToView(fileName);
  };

  const closeFileViewer = () => {
    setFileToView(null);
  };

  const deleteFolder = async (folderId) => {
    try {
      const folderRef = doc(db, 'folders', folderId);
      await deleteDoc(folderRef);
      alert("Folder deleted successfully!");
      setFolders(folders.filter(folder => folder.id !== folderId));
    } catch (error) {
      console.error("Error deleting folder:", error);
      alert("Failed to delete folder. Please try again.");
    }
  };

  const openFolder = async (folder) => {
    setCurrentFolder(folder);
    setCurrentFolderFiles([]);
    setShowAddFiles(true);
    console.log(`Opening folder: ${folder.name}`);
  };

  const handleAddFilesToFolder = () => {
    setShowUploadOptions(true);
  };

  return (
    <div className="feed-container">
      <h1>Home</h1>

      <button onClick={() => setShowUploadOptions(!showUploadOptions)} className="upload-toggle-button">
        Upload
      </button>
      <button onClick={() => setShowCreateFolder(!showCreateFolder)} className="create-folder-button">
        + Create
      </button>

      {showUploadOptions && (
        <div className="upload-options">
          <label className="upload-button">
            <input type="file" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} style={{ display: 'none' }} />
            <span> Select Files </span>
          </label>
          <label>
            <span>Expiration Date:</span>
            <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
          </label>
          <label>
            <span>Version:</span>
            <input type="number" value={version} onChange={(e) => setVersion(Number(e.target.value))} min="1" />
          </label>
          <button onClick={uploadFiles} className="upload-button">
            Confirm Upload
          </button>
        </div>
      )}

      {showCreateFolder && (
        <div className="create-folder-container">
          <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Enter folder name" />
          <button onClick={createFolder} className="create-folder-button">Create Folder</button>
        </div>
      )}

      <div className="upload-preview">
        {selectedFiles.length > 0 && (
          <div>
            <h4>Selected Files:</h4>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="uploaded-files">
        {uploadedFiles.length > 0 && (
          <div>
            <h4>Uploaded Files:</h4>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <a href={file.url} target="_blank" rel="noopener noreferrer"> View</a>
                  <button onClick={() => openFile(file.name)} className="open-file-button">Open</button>
                  <button onClick={() => deleteFile(file.name)} className="delete-file-button">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="folders">
        {folders.length > 0 && (
          <div>
            <h4>Folders:</h4>
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  {folder.name}
                  <button onClick={() => openFolder(folder)} className="open-folder-button">Open</button>
                  <button onClick={() => deleteFolder(folder.id)} className="delete-folder-button">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showAddFiles && currentFolder && (
        <div className="add-files-container">
          <h4>Files in {currentFolder.name}</h4>
          <button onClick={handleAddFilesToFolder} className="add-files-button">+ Add Files</button>
          {currentFolderFiles.length > 0 && (
            <ul>
              {currentFolderFiles.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <button onClick={() => deleteFile(file.name)} className="delete-file-button">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {fileToView && (
        <FileViewer fileName={fileToView} onClose={closeFileViewer} />
      )}
    </div>
  );
};

export default Feed;
