import React, { useState } from 'react';

const Folder = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      <div onClick={toggleFolder} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        {folder.name} {isOpen ? '-' : '+'}
      </div>
      {isOpen && (
        <div style={{ paddingLeft: '20px' }}>
          {folder.files.map(file => (
            <div key={file.id}>{file.name}</div>
          ))}
          {folder.subfolders.map(subfolder => (
            <Folder key={subfolder.id} folder={subfolder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
