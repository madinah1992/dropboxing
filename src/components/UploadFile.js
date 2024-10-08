// src/components/UploadFile.js
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import CryptoJS from "crypto-js";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [encryptedLink, setEncryptedLink] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const encryptURL = (url) => {
    const secretKey = "your-secret-key";
    const encrypted = CryptoJS.AES.encrypt(url, secretKey).toString();
    return encrypted;
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress updates if needed
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => {
        // On successful upload, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const encryptedURL = encryptURL(downloadURL);
          const shareableLink = `https://your-app.com/download?file=${encodeURIComponent(encryptedURL)}`;
          setEncryptedLink(shareableLink);
        });
      }
    );
  };

  return (
    <div>
      <h3>Upload and Share a File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>

      {encryptedLink && (
        <div>
          <h4>Shareable Encrypted Link:</h4>
          <a href={encryptedLink} target="_blank" rel="noopener noreferrer">
            {encryptedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
