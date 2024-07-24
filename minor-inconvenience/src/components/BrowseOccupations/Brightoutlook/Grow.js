import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Grow.css";
import { Link, useParams } from "react-router-dom";

let code = window.location.href.split("/")[5];
function Grow() {
  var { code } = useParams();
  const titleData = { grow: "Rapid Growth" ,openings: "Numerous Job Openings",emerging: "New and Emerging"};
  const [responseArray, setresponseArray] = useState([]);
  const [visibleRows, setVisibleRows] = useState(20);
  const loadMore = () => {
    setVisibleRows(visibleRows + 20);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/browseoccupations/brightoutlook/${code}`)
      .then(function (response) {
        setresponseArray(response.data);
        console.log("Response from Flask API:", response.data[1]);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="job-table-container">
      <h1 className="job-table-title">{titleData[code]}</h1>
      <table className="job-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Names</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {responseArray.slice(0, visibleRows).map((item, index) => (
            <tr key={item.code}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>
                <Link to={`/viewjob/${item.code}`} className="job-link">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleRows < responseArray.length && (
        <button onClick={loadMore} className="view-more-button">
          View More
        </button>
      )}
    </div>
  );
}

export default Grow;
