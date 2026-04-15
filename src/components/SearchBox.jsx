import React, { useState, useEffect, useRef } from 'react';

const SearchBox = ({ onSearch, onGetCurrentLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (val) => {
    if (val.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${val}&count=5&language=fr&format=json`);
      const data = await res.json();
      setSuggestions(data.results || []);
      setShowDropdown(true);
    } catch (err) {
      console.error("Erreur suggestions:", err);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    fetchSuggestions(val);
  };

  const handleSelect = (city) => {
    setQuery(city.name);
    setShowDropdown(false);
    onSearch(city.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-section animate-fade" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Rechercher une ville..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          />
          <div className="button-group">
            <button type="submit" className="btn-icon" title="Rechercher">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button 
              type="button" 
              className="btn-icon location-btn" 
              onClick={onGetCurrentLocation}
              title="Ma position"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </button>
          </div>
        </div>

        {showDropdown && suggestions.length > 0 && (
          <ul className="suggestions-dropdown glass-card">
            {suggestions.map((city, idx) => (
              <li key={idx} onClick={() => handleSelect(city)} className="suggestion-item">
                <span className="name">{city.name}</span>
                <span className="country">{city.country} {city.admin1 ? `, ${city.admin1}` : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .search-section {
          width: 100%;
          max-width: 600px;
          margin: 0 auto 2rem;
          position: relative;
          z-index: 100;
        }
        .search-container {
          position: relative;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 4px;
          backdrop-filter: blur(8px);
        }
        .search-wrapper .input-field {
          background: transparent;
          border: none;
          padding: 0.75rem 1rem;
          flex: 1;
        }
        .button-group {
          display: flex;
          gap: 4px;
          padding-right: 4px;
        }
        .btn-icon {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .btn-icon:hover {
          background: var(--accent-blue);
          transform: scale(1.05);
        }
        .location-btn:hover {
          background: var(--accent-purple);
        }
        .suggestions-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          list-style: none;
          padding: 8px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .suggestion-item {
          padding: 12px 16px;
          cursor: pointer;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transition: background 0.2s ease;
        }
        .suggestion-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .suggestion-item .name {
          font-weight: 600;
          font-size: 1rem;
        }
        .suggestion-item .country {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}} />
    </div>
  );
};

export default SearchBox;
