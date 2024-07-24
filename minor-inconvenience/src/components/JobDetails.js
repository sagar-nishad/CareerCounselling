import React, { useEffect, useState } from "react";
import "./JobDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { code } = useParams();
  var [detailsArray, setDetailsArray] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/viewjobdetails/${code}`)
      .then(function (response) {
        setDetailsArray(response.data);
        setAbilities(response.data.abilities.element);
        setSkills(response.data.skills.element);
        setActivity(response.data.detailed_work_activities.activity);
        console.log("Response Array->>>", detailsArray);
        console.log("activity  Array->>>",activity);
        // console.log("Ablities  Array->>>",abilities?.element[0]?.name)
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="description-container">
      <h1>Job Details </h1>

      {/* the activity Div */}
      <div className="abilities-container">
        <h1 className="abilities-title">Activity</h1>
        <ul  className="abilities-list">
          {activity?.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
                {/* <strong>{ability.name} : </strong> */}
                &#9830; {ability.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* The Educations */}
      <div className="abilities-container">
        <h1 className="abilities-title">Education Required </h1>
        <ul className="abilities-list">
          {detailsArray?.education?.level_required.category?.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
              &#9830; <strong>{ability.name} : </strong>
                {ability.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* The Knowledge */}
      <div className="abilities-container">
        <h1 className="abilities-title">Knowledge Details </h1>
        <ul className="abilities-list">
          {detailsArray?.knowledge?.element?.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
              &#9830; <strong>{ability.name} : </strong>
                {ability.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* Tools */}
      <div className="abilities-container">
        <h1 className="abilities-title">Tools Used </h1>
        <ul className="abilities-list">
          {detailsArray?.tools_technology?.tools.category?.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
              &#9830; <strong>{ability.title.name}  </strong>
                
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* The Task div  */}
      <div className="abilities-container">
        <h1 className="abilities-title">Task</h1>
        <ul className="abilities-list">
          {detailsArray?.tasks?.task.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
              &#9830; <strong>{ability.category} : </strong>
                {ability.statement} 
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* The abilities div  */}
      <div className="abilities-container">
        <h1 className="abilities-title">Abilities</h1>
        <ul className="abilities-list">
          {abilities?.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
              &#9830; <strong>{ability.name} : </strong>
                {ability.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="abilities-container">
        <h1 className="abilities-title">Soft Skills</h1>
        <ul className="abilities-list">
          {skills?.map((ability, index) => (
            <li key={index} className="ability-item">
              <p className="ability-description">
              &#9830; <strong>{ability.name} : </strong>
                {ability.description}
              </p>
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}

export default JobDetails;
