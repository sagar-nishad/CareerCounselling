// TimetableForm.js
import React, { useState } from 'react';
import './TimetableForm.css'; // Import your CSS file for styling
// ========================================
function handleNullValues(timetable) {
  const daysOfWeek = Object.keys(timetable);

  for (const day of daysOfWeek) {
      for (let i = 0; i < 6; i++) {
          if (timetable[day][i] === null) {

            let k = i;
              // Find combined subjects from the same type and insert as a single period
              for (let j = i-1; j >= 0; j--) {
                  if (timetable[day][j] && timetable[day][j].includes('/')) {
                      const combinedSubjects = timetable[day][j].split('/');
                      timetable[day][i] = combinedSubjects[0]; // Insert the first subject
                      timetable[day][j] = combinedSubjects[1]; // Update the combined subject
                      break;
                  }
              }
          }
      }
  }
}

function distributePeriods(subjects)
 {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timetable = {};

  // Initialize an array for each day of the week with 6 slots
  for (const day of daysOfWeek) {
    timetable[day] = new Array(6).fill(null);
  }


  // Distribute periods for each subject
 // Add the following code inside the subjects.forEach loop

  subjects.forEach((subjectObj) => {
      const { name, info } = subjectObj;
      const { L, T, P } = info;
      const periods = [];
      let lectureCount = 0 ;
      let PractCount = 0;

      if( L !== 0){
        if (T !== 0) 
          lectureCount = L + T ;
        else
          lectureCount = (L*2) + 1 ; 
      }

      if(P >= 4)
      {
         PractCount = P;
      }
      else{
        PractCount = P*2;
      }

  

      

      for (var i = 0; i < lectureCount ; i++) {
          periods.push(`${name}(L)`);
          // console.log(i);
          // console.log(name);
        }
      
      for (i = lectureCount; i < lectureCount + (T*2); i++) {
          periods.push(`${name}(T)`);
          // console.log(i);
          // console.log(name);
        }

        for (i = lectureCount + (T*2); i < lectureCount + (T*2) + PractCount; i++) {
          periods.push(`${name}(P)`);
        //   console.log(i);
        }

      shuffleArray(periods);
     
      let totalPeriods = periods.length;
      let currentIndex = 0;

      for (let i = 0; i < 6; i++) {
        for (const day of daysOfWeek) {
          if (totalPeriods === 0) {
            break; // No more periods left to distribute
          }

          if (!timetable[day][i]) {
            const currentPeriod = periods[currentIndex];
            const currentType = currentPeriod.slice(-3); // Extract the type of the current period
            const currentSubject = currentPeriod.slice(0, -3); 

            // Find periods of the same type in the timetable
            const sameTypeIndexes = [];
            timetable[day].forEach((period, index) => {
                if (period && period.endsWith(currentType) && !period.startsWith(currentSubject) && period.indexOf('/') === -1) {
                    sameTypeIndexes.push(index);
                }
            });

            if (sameTypeIndexes.length > 0) {
              // Combine current period with the first found period of the same type
              const firstIndex = sameTypeIndexes[0];
              
              timetable[day][firstIndex] = `${currentPeriod}/${timetable[day][firstIndex]}`;
              currentIndex += 1; // Increment by 1 since you're combining with an existing period
              totalPeriods -= 1;
          
            // else {
            //     // If there's an issue with the subjects, use the current period alone
            //     timetable[day][i] = currentPeriod;
            //     currentIndex += 1;
            //     totalPeriods -= 1;
            // }
            } else {
              // If no other periods of the same type, use the current period
              timetable[day][i] = currentPeriod;
              currentIndex += 1;
              totalPeriods -= 1;
            }
          }
 

        }
      }
});

  // Add specific subjects to Saturday
  const saturday = 'Saturday';
  subjects.forEach((subjectObj) => {
    const { name } = subjectObj;
    if (name === 'Industrial Visit' || name === 'Industrial Training' || name === 'Club Activities') {
      timetable[saturday].push(`${name}`);
    }
  });

  return timetable;
  }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ========================================

const TimetableForm = () => {
  const initialRow = { name: '', info: { L: 0, T: 0, P: 0 } };
  const [timetableData, setTimetableData] = useState([initialRow]);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);


  const addRow = () => {
    setTimetableData([...timetableData, { ...initialRow }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...timetableData];
    updatedData[index][field] = value;
    setTimetableData(updatedData);
  };

  const handleInfoChange = (index, field, value) => {
    const updatedData = [...timetableData];
    updatedData[index].info[field] = value;
    setTimetableData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let generatedData = distributePeriods(timetableData);
    handleNullValues(generatedData);
    setGeneratedTimetable(generatedData);
    console.log(">>>>>>",generatedData)
    // console.log(timetableData);
  };
  const handlePrint = () => {
    const printContent = document.getElementById('generated-timetable');
  const originalContents = document.body.innerHTML;

  // Temporarily replace the body content with the timetable content
  document.body.innerHTML = printContent.innerHTML;

  // Print the timetable
  window.print();

  // Restore the original body content
  document.body.innerHTML = originalContents;
  };

  return (
    <div>

    <form className="timetable-form" onSubmit={handleSubmit}>
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Lab Classes</th>
            <th>Theory Classes</th>
            <th>Practical Classes</th>
          </tr>
        </thead>
        <tbody>
          {timetableData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  className="dark-input"
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="dark-input"
                  type="number"
                  value={row.info.L}
                  onChange={(e) => handleInfoChange(index, 'L', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="dark-input"
                  type="number"
                  value={row.info.T}
                  onChange={(e) => handleInfoChange(index, 'T', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="dark-input"
                  type="number"
                  value={row.info.P}
                  onChange={(e) => handleInfoChange(index, 'P', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="dark-button" onClick={addRow}>
        Add Row
      </button>
      <button type="submit" className="dark-button">
        Submit
      </button>
    </form>
    {generatedTimetable && (
        <div id="generated-timetable" > 
          <h2>Generated Timetable</h2>
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(generatedTimetable).map(([day, classes]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{classes.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="dark-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      )}
    </div>

  );
};

export default TimetableForm;
