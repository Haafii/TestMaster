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
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Created Tests</h2>
      {tests.map(test => (
        <div key={test._id} className="mb-4">
          <button
            onClick={() => window.location.href = `/teacher/test/${test._id}`}
            className="text-blue-500 hover:underline"
          >
            {test.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeacherTestsPage;
