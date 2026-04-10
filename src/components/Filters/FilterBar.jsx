import React from 'react';

const FilterBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy, filterType, setFilterType }) => {
  return (
    <div className="container">
      <div className="controls-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="manga">Manga</option>
          <option value="novel">Novels</option>
        </select>

        <select 
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="title">Alphabetical</option>
          <option value="score">Top Score / Rating</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
