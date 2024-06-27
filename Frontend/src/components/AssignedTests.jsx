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
    <div className="p-4 bg-primary flex flex-col items-center justify-center h-screen w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">Assigned Tests</h2>
      {tests.map(test => (
        <div key={test._id} className="mb-4">
          <button
            onClick={() => window.location.href = `/test/${test._id}`}
            className="bg-sky-500 hover:bg-sky-600 py-2  px-4 rounded-lg text-white hover:text-secondary "
          >
            {test.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssignedTests;
