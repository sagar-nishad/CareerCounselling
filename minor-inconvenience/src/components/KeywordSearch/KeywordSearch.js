// src/components/KeywordSearch.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./KeywordSearch.css";

const KeywordSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    axios
      .get(`http://127.0.0.1:5000/api/keywordSearch?term=${searchTerm}`)
      .then(function (response) {
        setSearchResults(response.data);
       
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  return (
    <div className="keyword-search-container">
      <h1 className="keyword-search-title">Keyword Search</h1>
      <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter keyword..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.code}>
                {result.title}
                <Link to={`/viewjob/${result.code}`} className="result-link">
                  Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KeywordSearch;
