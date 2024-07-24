import React, { useEffect, useState } from 'react'
import "./Viewjob.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Brightoutlook from './BrowseOccupations/Brightoutlook';
function Viewjob() {
    var {code } = useParams();
    var [responseArray, setresponseArray] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/viewjob/${code}`)
        .then(function (response) {
          setresponseArray(response.data)
          console.log('Response from Flask API:', response.data);
          console.log(responseArray?.code)
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
      
    }, [])
    
  return (
   
    <div className="view-job-container">
      <div className="view-job-box">
        <h2 className="job-title">{responseArray?.title}</h2>
        <p className="job-code">Code: {responseArray?.code}</p>
        <p className="job-description">{responseArray?.description}</p>
        <p className="job-text">{responseArray?.bright_outlook?.description}</p>
        <Link to={`/viewjobdetails/${code}`} className="view-details-button">
        View Details
      </Link>
      </div>
    </div>
  )
}

export default Viewjob