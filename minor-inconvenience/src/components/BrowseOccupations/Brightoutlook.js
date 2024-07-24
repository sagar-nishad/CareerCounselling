import React from "react";
import { Link } from "react-router-dom";
import "./Brightoutlook.css";

const Brightoutlook = () => {
  return (
    <div className="bright-outlook-container">
      <h1 className="bright-outlook-title">Bright Outlook Jobs</h1>
      <div className="bright-outlook-boxes">
        <div className="bright-outlook-box">
          <h2 className="box-title">Rapid Growth</h2>
          <p className="box-description">
            These occupations are projected to grow much faster than average
            (employment increase of 14% or more) over the period 2022-2032.
          </p>
          <Link
            to="/browseoccupations/brightoutlook/grow"
            className="box-link"
          >
            Learn more
          </Link>
        </div>
        <div className="bright-outlook-box">
          <h2 className="box-title">Numerous Job Openings</h2>
          <p className="box-description">
            These occupations are projected to have 100,000 or more job openings
            over the period 2022-2032.
          </p>
          <Link
            to="/browseoccupations/brightoutlook/openings"
            className="box-link"
          >
            Learn more
          </Link>
        </div>
        <div className="bright-outlook-box">
          <h2 className="box-title">New and Emerging</h2>
          <p className="box-description">
            These occupations are New & Emerging occupations in high growth
            industries.
          </p>
          <Link
            to="/browseoccupations/brightoutlook/emerging"
            className="box-link"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Brightoutlook;
