import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherTestsPage = () => {
  const [tests, setTests] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8501/test/createdBy/${username}`);
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    fetchTests();
  }, [username]);

  return (
    <div className="p-4 bg-primary flex flex-col items-center justify-center  shadow-md h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Created Tests</h2>
      {tests.map(test => (
        <div key={test._id} className="mb-4 flex shadow-md bg-secondary px-4 py-6 rounded-lg w-3/6 items-center justify-center">
          <button
            onClick={() => window.location.href = `/teacher/test/${test._id}`}
            className="bg-sky-500 hover:bg-sky-600 items-center w-3/6 justify-center text-secondary font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            {test.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeacherTestsPage;
