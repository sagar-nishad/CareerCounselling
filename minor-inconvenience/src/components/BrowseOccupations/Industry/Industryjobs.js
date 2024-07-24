// src/components/IndustryJobs.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Industryjobs.css';
import axios from 'axios';

const Industryjobs = () => {
  // Sample data for the job cards
  let {industryCode} = useParams();

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/api/browseoccupations/industry/${industryCode}`
      )
      .then(function (response) {
        setjobData(response.data);
        console.log("Response from Flask API: Industry wala", response.data);
        console.log("code =>>>", industryCode);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }, []);

  const [jobData , setjobData] = useState();

  return (
    <div className="industry-jobs-container">
      <h1 className="industry-jobs-title">Industry Jobs {industryCode}</h1>
      <div className="industry-jobs-cards">
        {jobData?.map((job, index) => (
          <div className="industry-jobs-card" key={index}>
            <h3>{job.title}</h3>
            <p>Code: {job.code}</p>
            <p>Projected Growth(2022-2032): {job.projected_growth}</p>
            <p>Projected Openings: {job.projected_openings}</p>
            <Link to={`/viewjob/${job.code}`} className="view-job-button">
              View Job
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industryjobs;
