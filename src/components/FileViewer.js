// FileViewer.js
import React from 'react';
import { storage } from '../firebase'; // Import Firebase storage
import { ref, getDownloadURL } from "firebase/storage"; // Import necessary functions from Firebase storage

const FileViewer = ({ fileName, onClose }) => {
  const [fileURL, setFileURL] = React.useState(null);

  React.useEffect(() => {
    const fetchFileURL = async () => {
      const fileRef = ref(storage, `files/${fileName}`);
      try {
        const url = await getDownloadURL(fileRef);
        setFileURL(url);
      } catch (error) {
        console.error("Error fetching file URL:", error);
      }
    };

    fetchFileURL();
  }, [fileName]);

  return (
    <div className="file-viewer">
      <h2>Viewing: {fileName}</h2>
      {fileURL ? (
        <iframe src={fileURL} title={fileName} style={{ width: '100%', height: '500px' }} />
      ) : (
        <p>Loading file...</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FileViewer;
