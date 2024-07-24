// src/components/Cluster.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Cluster.css";
import axios from "axios";

const Cluster = () => {
  let { clusterCode } = useParams();
  const initialCardData = [
    { title: "Cluster 1", code: "ABC123", pathway: "Engineering" },
    { title: "Cluster 2", code: "XYZ456", pathway: "Information Technology" },
    { title: "Cluster 1", code: "ABC123", pathway: "Engineering" },
    { title: "Cluster 2", code: "XYZ456", pathway: "Information Technology" },
    { title: "Cluster 1", code: "ABC123", pathway: "Engineering" },
    { title: "Cluster 2", code: "XYZ456", pathway: "Information Technology" },
  ];

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/api/browseoccupations/careerclusters/${clusterCode}`
      )
      .then(function (response) {
        setCardData(response.data);
        console.log("Response from Flask API: Cluster wala", response.data);
        console.log("code =>>>", clusterCode);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }, []);

  const [cardData, setCardData] = useState();
 console.log()
  const [visibleCards, setVisibleCards] = useState(20); // Initially display 20 cards

  const loadMore = () => {
    const remainingCards = cardData?.length - visibleCards;
    const loadCount = remainingCards >= 20 ? 20 : remainingCards;
    setVisibleCards(visibleCards + loadCount);
  };

  return (
    <div className="cluster-container">
      <h1 className="cluster-title">Career Cluster : {cardData?cardData[0].career_cluster.title:""}</h1>

      <div className="cluster-cards">
        {cardData?.slice(0, visibleCards).map((card, index) => (
          
          <div className="cluster-card" key={index}>
            <h3>{card?.title}</h3>
            <p>Code: {card?.code}</p>
            <p>Career Pathway: {card?.career_pathway.title}</p>
            <Link to={`/viewjob/${card?.code}`} className="view-details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
      {visibleCards < cardData?.length && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default Cluster;
