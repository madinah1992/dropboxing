// src/PreviewFile.js
import React from 'react';

const PreviewFile = ({ file }) => {
  const { url, type, name } = file;

  // Render the preview based on file type
  const renderPreview = () => {
    if (type && type.startsWith('image/')) {
      return <img src={url} alt={name} style={{ maxWidth: '100%' }} />;
    } else if (type && type.startsWith('video/')) {
      return <video src={url} controls style={{ maxWidth: '100%' }} />;
    } else if (type === 'application/pdf') {
      return <iframe src={url} style={{ width: '100%', height: '500px' }} title={name} />;
    } else {
      return <p>No preview available for this file type.</p>;
    }
  };

  return (
    <div>
      <h3>Preview: {name}</h3>
      {renderPreview()}
    </div>
  );
};

export default PreviewFile;
