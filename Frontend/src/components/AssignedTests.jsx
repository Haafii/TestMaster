// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import test from 'node:test';

// const AssignedTests = () => {
//   const [tests, setTests] = useState([]);
//   const username = localStorage.getItem('username');

//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8501/test/gettest/${username}`);
//         setTests(response.data);
//         console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching tests:', error);
//       }
//     };
//     fetchTests();
//   }, [username]);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
//       <h2 className="text-2xl font-bold mb-4">Assigned Tests</h2>
//       {tests.map(test => (
//         <div key={test._id} className="mb-4">
//           <button
//             onClick={() => window.location.href = `/test/${test._id}`}
//             className="text-blue-500 hover:underline"
//           >
//             {test.title}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AssignedTests;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignedTests = () => {
  const [tests, setTests] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8501/test/gettest/${username}`);
        // Filter the tests to include only those where submissionStatus is false for the current user
        const filteredTests = response.data.filter(test => 
          test.assignedStudents.some(student => student.studentId === username && student.submissionStatus === false)
        );
        setTests(filteredTests);
        console.log(filteredTests);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, [username]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Assigned Tests</h2>
      {tests.map(test => (
        <div key={test._id} className="mb-4">
          <button
            onClick={() => window.location.href = `/test/${test._id}`}
            className="text-blue-500 hover:underline"
          >
            {test.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssignedTests;
