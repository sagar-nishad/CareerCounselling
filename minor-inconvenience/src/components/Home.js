import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Career Counselling</h1>
      <div className="button-box">
        <Link to="/browseoccupations" className="landing-button">Browse Occupations</Link>
        <Link to="/keywordSearch" className="landing-button">Keyword Search</Link>
        <Link to="/interestprofiler" className="landing-button">Interest Profiler</Link>
        {/* <Link to="/testing" className="landing-button">Link 4</Link>
        <Link to="/link5" className="landing-button">Link 5</Link> */}
      </div>
    </div>
  );
}

export default Home;
