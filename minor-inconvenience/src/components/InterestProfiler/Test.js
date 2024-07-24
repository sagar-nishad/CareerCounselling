// src/components/Test.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css'; // Assuming you have the corresponding CSS file

const Test = () => {
  const navigate = useNavigate();

  const questionsList = [
    {
      "index" : 1,
      "area" : "Realistic",
      "text" : "Build kitchen cabinets"
   },
   {
      "index" : 2,
      "area" : "Investigative",
      "text" : "Develop a new medicine"
   },
   {
      "index" : 3,
      "area" : "Artistic",
      "text" : "Write books or plays"
   },
   {
      "index" : 4,
      "area" : "Social",
      "text" : "Help people with personal or emotional problems"
   },
   {
      "index" : 5,
      "area" : "Enterprising",
      "text" : "Manage a department within a large company"
   },
   {
      "index" : 6,
      "area" : "Conventional",
      "text" : "Install software across computers on a large network"
   },
   {
      "index" : 7,
      "area" : "Realistic",
      "text" : "Repair household appliances"
   },
   {
      "index" : 8,
      "area" : "Investigative",
      "text" : "Study ways to reduce water pollution"
   },
   {
      "index" : 9,
      "area" : "Artistic",
      "text" : "Compose or arrange music"
   },
   {
      "index" : 10,
      "area" : "Social",
      "text" : "Give career guidance to people"
   },
   {
      "index" : 11,
      "area" : "Enterprising",
      "text" : "Start your own business"
   },
   {
      "index" : 12,
      "area" : "Conventional",
      "text" : "Operate a calculator"
   },
   {
      "index" : 13,
      "area" : "Realistic",
      "text" : "Assemble electronic parts"
   },
   {
      "index" : 14,
      "area" : "Investigative",
      "text" : "Conduct chemical experiments"
   },
   {
      "index" : 15,
      "area" : "Artistic",
      "text" : "Create special effects for movies"
   },
   {
      "index" : 16,
      "area" : "Social",
      "text" : "Perform rehabilitation therapy"
   },
   {
      "index" : 17,
      "area" : "Enterprising",
      "text" : "Negotiate business contracts"
   },
   {
      "index" : 18,
      "area" : "Conventional",
      "text" : "Keep shipping and receiving records"
   },
   {
      "index" : 19,
      "area" : "Realistic",
      "text" : "Drive a truck to deliver packages to offices and homes"
   },
   {
      "index" : 20,
      "area" : "Investigative",
      "text" : "Examine blood samples using a microscope"
   },
   {
      "index" : 21,
      "area" : "Artistic",
      "text" : "Paint sets for plays"
   },
   {
      "index" : 22,
      "area" : "Social",
      "text" : "Do volunteer work at a non-profit organization"
   },
   {
      "index" : 23,
      "area" : "Enterprising",
      "text" : "Market a new line of clothing"
   },
   {
      "index" : 24,
      "area" : "Conventional",
      "text" : "Inventory supplies using a hand-held computer"
   },
   {
      "index" : 25,
      "area" : "Realistic",
      "text" : "Test the quality of parts before shipment"
   },
   {
      "index" : 26,
      "area" : "Investigative",
      "text" : "Develop a way to better predict the weather"
   },
   {
      "index" : 27,
      "area" : "Artistic",
      "text" : "Write scripts for movies or television shows"
   },
   {
      "index" : 28,
      "area" : "Social",
      "text" : "Teach a high-school class"
   },
   {
      "index" : 29,
      "area" : "Enterprising",
      "text" : "Sell merchandise at a department store"
   },
   {
      "index" : 30,
      "area" : "Conventional",
      "text" : "Stamp, sort, and distribute mail for an organization"
   }
    // Add more questions as needed
  ];

  const options = ['Strongly Dislike', 'Dislike', 'Unsure', 'Like', 'Strongly Like'];

  const initialResponses = Object.fromEntries(questionsList.map((q) => [q.index, 3])); // Default is "Unsure"
  const [responses, setResponses] = useState(initialResponses);

  const handleOptionClick = (questionNumber, optionValue) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionNumber]: optionValue,
    }));
  };

  const handleSubmit = () => {
    const responseCode = Object.values(responses).join('');
    navigate(`/interestprofiler/results/${responseCode}`);
  };

  return (
    <div className="test-container">
      <h1 className="test-title">Interest Profiler Test</h1>

      {questionsList.map((question) => (
        <div key={question.index} className="question-box">
          <p className="question-text">{`${question.index}. ${question.text}`}</p>
          <div className="options-container">
            {options.map((optionValue, index) => (
              <div
                key={index}
                className={`option ${responses[question.index] === index + 1 ? 'selected' : ''}`}
                onClick={() => handleOptionClick(question.index, index + 1)}
              >
                {optionValue}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Test;
