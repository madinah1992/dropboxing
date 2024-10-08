// src/components/Search.js
import React, { useState } from 'react';

const Search = () => {
  const [showMoreWays, setShowMoreWays] = useState(false); // State to track search click

  const handleSearchClick = () => {
    setShowMoreWays(true); // Show the "More ways to find your files" section
  };

  return (
    <div>
      <h2>Search</h2>
      <button onClick={handleSearchClick}>Search</button>

      {showMoreWays && (
        <div className="more-ways">
          <h3>More ways to find your files</h3>
          <div className="people-section">
            <h4>People</h4>
            <p>If you work on files with other people, you can access the shared content here.</p>
          </div>
          <div className="tags-section">
            <h4>Tags</h4>
            <p>If you create tags, you'll have quick access to them here.</p>
            {/* Replace <a> with <button> if there's no actual link */}
            <button onClick={() => alert('Learn about tags')}>Learn about tags</button>
          </div>
          <div className="recent-files-section">
            <h4>Recent files</h4>
            <p>Items you recently viewed show up here.</p>
            {/* Replace <a> with <button> if there's no actual link */}
            <button onClick={() => alert('Learn more about recent files')}>Learn more</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
