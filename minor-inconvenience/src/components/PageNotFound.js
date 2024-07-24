// src/components/PageNotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">Sorry, the page you are looking for does not exist Or currently in development</p>
      <Link to="/" className="not-found-link">Go back to the Home page</Link>
    </div>
  );
};

export default PageNotFound;
