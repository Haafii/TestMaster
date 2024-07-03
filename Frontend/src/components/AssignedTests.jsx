import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignedTests = () => {
  const [tests, setTests] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8501/test/gettest/${username}`);
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

  const navigateBack = () => {
    window.history.back(); // Navigate to the previous page using browser history
  };

  return (
    <div className="p-4 bg-primary flex flex-col items-center justify-center min-h-screen w-full">

      <div className='flex flex-col w-full items-center justify-center'>
      <h2 className="text-2xl font-bold mb-4 text-white">Assigned Tests</h2>
        {tests.map(test => (
          <div key={test._id} className="mb-4 w-full flex items-center justify-center">
            <button
              onClick={() => window.location.href = `/test/${test._id}`}
              className="bg-sky-500 hover:bg-sky-600 py-2 px-4 w-2/6 rounded-lg text-white hover:text-secondary"
            >
              {test.title}
            </button>
          </div>
        ))}
      </div>
      
      <button
        onClick={navigateBack}
        className="bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-lg text-white hover:text-secondary"
      >
        Back
      </button>
    </div>
  );
};

export default AssignedTests;
