// src/components/CareerCluster.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CareerCluster.css';

const CareerCluster = () => {
  // Sample data for the cards
  const cardData = [
    { title: 'Agriculture, Food & Natural Resources' , code:"1.0000" },
    { title: 'Architecture & Construction' },
    { title: 'Arts, Audio/Video Technology & Communications' },
    { title: 'Business Management & Administration' },
    { title: 'Education & Training' },
    { title: 'Finance' },
    { title: 'Government & Public Administration' },
    { title: 'Health Science' },
    { title: 'Hospitality & Tourism' },
    { title: 'Human Services' },
    { title: 'Information Technology' },
    { title: 'Law, Public Safety, Corrections & Security' },
    { title: 'Manufacturing' },
    { title: 'Marketing' },
    { title: 'Science, Technology, Engineering & Mathematics' },
    { title: 'Transportation, Distribution & Logistics' },
  
    // ... Add more cards
  ];

  return (
    <div className="career-cluster-container">
      <h1 className="career-cluster-title">Career Clusters</h1>
      <div className="career-cluster-cards">
        {cardData.map((card, index) => (
          <div className="career-cluster-card" key={index}>
            <div className="card-content">
              <h3>{card.title}</h3>
            </div>
            <Link to={`/browseoccupations/careercluster/${index + 1}.0000`} className="card-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerCluster;
