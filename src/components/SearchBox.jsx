import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-container animate-fade">
      <div className="search-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .search-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto 2rem;
        }
        .search-wrapper {
          display: flex;
          gap: 0.5rem;
          position: relative;
        }
        .search-wrapper button {
          position: absolute;
          right: 5px;
          top: 5px;
          bottom: 5px;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-wrapper input {
          padding-right: 4rem;
        }
      `}} />
    </form>
  );
};

export default SearchBox;
