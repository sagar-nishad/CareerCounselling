import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Link, useParams } from "react-router-dom";
import "./Results.css";

function Results() {
  const { result } = useParams();
  const [resultResponse, setResultResponse] = useState({});
  const colors = [
    '#607D8B', 
    '#8D6E63', 
    '#78909C',
    '#4CAF50', 
    '#9C27B0', 
    '#FF5722', 
  ];
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/interest/${result}`)
      .then(function (response) {
        setResultResponse(response.data);
        // console.log("Response from Flask API: career wala", response.data);
        // console.log("Response from Flask API: result wala", resultResponse.result);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }, [resultResponse]);

  return (
    <div className="results-container">
      <h1 className="results-title">Results</h1>

      {resultResponse?.result?.result?.map((result, index) => (
        <div key={index} className="result-box">
          <h2 className="result-area">{result.area}</h2>
          <p className="result-description">{result.description}</p>
          <p className="result-score">Score: {result.score}</p>
        </div>
      ))}
      <div className="pieChartParent">
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resultResponse?.result?.result}
                dataKey="score"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {resultResponse?.result?.result?.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="color-legend">
          {resultResponse?.result?.result.map((result, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ color: colors[index % colors.length] }}
              >
                {result.area}
              </span>
              <span className="legend-label"></span>
            </div>
          ))}
        </div>
      </div>
      <div className="careers-list-container">
      <h1 className="careers-list-title">Matching Careers</h1>
      <ul className="careers-list">
        {resultResponse?.career?.career.map((career, index) => (
          <li key={index} className="career-item">
            <div className="career-info">
              <span className="career-name">{career.title}</span>
              <Link to={`/viewJob/${career.code}`} className="view-details-link">
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Results;
