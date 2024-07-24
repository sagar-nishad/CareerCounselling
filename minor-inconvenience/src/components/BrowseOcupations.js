// src/components/BrowseOccupations.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BrowseOccupations.css';

const BrowseOccupations = () => {
  return (
    <div className="browse-occupations-container">
      <h1 className="browse-occupations-title">Browse Occupations</h1>
      <div className="browse-occupations-links">
        <Link to="/browseoccupations/brightoutlook" className="browse-occupations-link">Browse Bright Outlook occupations</Link>
        <Link to="/browseoccupations/careercluster" className="browse-occupations-link">Browse by Career Cluster</Link>
        <Link to="/browseoccupations/industry" className="browse-occupations-link">Browse by Industry </Link>
        <Link to="/browseoccupations/link4" className="browse-occupations-link">Browse by Job Family</Link>
        <Link to="/browseoccupations/link5" className="browse-occupations-link">Browse by Hot Technology</Link>
      
      </div>
    </div>
  );
};

export default BrowseOccupations;
