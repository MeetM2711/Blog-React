import React, { useContext } from 'react';
import { SearchContext } from './SearchContext';

const SearchButton = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);  
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
};

export default SearchButton;
