import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const role = localStorage.getItem('role')
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Home Page</h2>
      {role === 'teacher' && (
        <div>
          <Link to="/add-question" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Add Question</Link>
          <Link to="/create-test" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Create Test</Link>
          <Link to="/view-submission" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">View Submission</Link>
        </div>
      )}
      {role === 'student' && (
        <div>
          <Link to="/assigned-tests" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Assigned Tests</Link>
          <Link to="/view-result" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">View Result</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
