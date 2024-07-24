// src/components/Industry.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Industrygroup.css';

const Industrygroup = () => {
  // Sample data for the cards
  const cardData = [
    {
        "href" : "https://services.onetcenter.org/ws/online/industries/72",
        "code" : 72,
        "title" : "Accommodation and Food Services"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/56",
        "code" : 56,
        "title" : "Administrative and Support Services"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/11",
        "code" : 11,
        "title" : "Agriculture, Forestry, Fishing, and Hunting"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/71",
        "code" : 71,
        "title" : "Arts, Entertainment, and Recreation"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/23",
        "code" : 23,
        "title" : "Construction"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/61",
        "code" : 61,
        "title" : "Educational Services"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/52",
        "code" : 52,
        "title" : "Finance and Insurance"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/93",
        "code" : 93,
        "title" : "Government"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/62",
        "code" : 62,
        "title" : "Health Care and Social Assistance"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/51",
        "code" : 51,
        "title" : "Information"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/55",
        "code" : 55,
        "title" : "Management of Companies and Enterprises"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/31",
        "code" : 31,
        "title" : "Manufacturing"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/21",
        "code" : 21,
        "title" : "Mining, Quarrying, and Oil and Gas Extraction"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/81",
        "code" : 81,
        "title" : "Other Services (Except Public Administration)"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/54",
        "code" : 54,
        "title" : "Professional, Scientific, and Technical Services"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/53",
        "code" : 53,
        "title" : "Real Estate and Rental and Leasing"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/44",
        "code" : 44,
        "title" : "Retail Trade"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/48",
        "code" : 48,
        "title" : "Transportation and Warehousing"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/22",
        "code" : 22,
        "title" : "Utilities"
     },
     {
        "href" : "https://services.onetcenter.org/ws/online/industries/42",
        "code" : 42,
        "title" : "Wholesale Trade"
     }
  ];

  return (
    <div className="industry-container">
      <h1 className="industry-title">Industry</h1>
      <div className="industry-cards">
        {cardData.map((card, index) => (
          <div className="industry-card" key={index}>
            <h3>{card.title}</h3>
            <Link to={`/browseoccupations/industry/${card.code}`} className="industry-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industrygroup;
