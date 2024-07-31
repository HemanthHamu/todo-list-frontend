import React from 'react';

import '../styles/searchbar.css'
function SearchBar({ searchText, onSearch }) {
  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search tasks..."
      className='search-tasks'
    />
  );
}

export default SearchBar;
