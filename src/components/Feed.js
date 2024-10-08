import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebase'; 
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore"; 
import './Feed.css';
import { useNavigate } from 'react-router-dom';
import { uploadBytes } from 'firebase/storage';
import FileViewer from './FileViewer'; // Adjust the path if necessary
import { useAuth } from '../contexts/AuthProvider'; // Import the useAuth hook

const Feed = () => {
  const { currentUser } = useAuth(); // Access the current user from the Auth context
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Now an array of objects
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [fileToView, setFileToView] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentFolderFiles, setCurrentFolderFiles] = useState([]);
  const [expirationDate, setExpirationDate] = useState(''); // State for expiration date
  const [version, setVersion] = useState(1); // State for versioning
  const [showAddFiles, setShowAddFiles] = useState(false); // State to show "Add Files" button

  useEffect(() => {
    fetchFolders();
    if (currentUser) {
      fetchUploadedFiles(); // Fetch uploaded files for the current user
    }
  }, [currentUser]); // Dependency on currentUser to refetch when it changes

  const fetchFolders = async () => {
    try {
      const foldersCollection = collection(db, 'folders');
      const snapshot = await getDocs(foldersCollection);
      const foldersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFolders(foldersList);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  // New function to fetch uploaded files for the current user
  const fetchUploadedFiles = async () => {
    try {
      const filesCollection = collection(db, 'files');
      const q = query(filesCollection, where('uploadedBy', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const filesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUploadedFiles(filesList); // Update state with the user's files
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const uploadFiles = async () => {
    const promises = selectedFiles.map(async (file) => {
      const fileRef = ref(storage, `files/${file.name}`);
      await uploadBytes(fileRef, file); // Include the file in the upload

      // Generate the download URL after the file is uploaded
      const downloadURL = await getDownloadURL(fileRef);

      // Save file details to Firestore
      const fileDetails = {
        name: file.name,
        version: version, // Store the version
        expiration: expirationDate, // Store expiration date
        uploadedAt: new Date(),
        uploadedBy: currentUser?.uid, // Save the user ID who uploaded the file
        url: downloadURL // Store the download URL
      };

      // Add file details to Firestore
      const filesCollection = collection(db, 'files'); // Adjust the path as needed
      await addDoc(filesCollection, fileDetails); // Add the file details to Firestore
      return fileDetails; // Return the file details object after successful upload
    });

    try {
      const uploadedFileDetails = await Promise.all(promises);
      alert("Files uploaded successfully!");
      setUploadedFiles([...uploadedFiles, ...uploadedFileDetails]); // Store the file details
      setSelectedFiles([]);
      setShowUploadOptions(false);
      if (currentFolder) {
        fetchCurrentFolderFiles(currentFolder.id); // Fetch files for the current folder after upload
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
      setCurrentFolderFiles(filesList); // Update state with the folder's files
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };
  

  const createFolder = async () => {
    if (folderName.trim() !== '') {
      const newFolder = {
        name: folderName,
        createdAt: new Date(),
        createdBy: currentUser?.uid, // Save the user ID who created the folder
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
      setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName)); // Filter out the deleted file
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
    setShowAddFiles(true); // Show "Add Files" button when folder is opened
    console.log(`Opening folder: ${folder.name}`);
  };

  // Function to handle adding files to the current folder
  const handleAddFilesToFolder = () => {
    // Implement logic to add files to the current folder
    // This could involve showing an upload dialog or similar
    // For example, you could show upload options specific to the folder
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
            <span> Files </span>
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
                  <a href={file.url} target="_blank" rel="noopener noreferrer"> View</a> {/* Display the file URL */}
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

      {/* Conditionally render "Add Files" button when a folder is open */}
      {showAddFiles && currentFolder && (
        <div className="add-files-container">
          <h4>Add Files to {currentFolder.name}:</h4>
          <button onClick={handleAddFilesToFolder} className="add-files-button">Add Files</button>
        </div>
      )}

      {/* Render File Viewer if fileToView is set */}
      {fileToView && <FileViewer fileName={fileToView} onClose={closeFileViewer} />}
    </div>
  );
};

export default Feed;
