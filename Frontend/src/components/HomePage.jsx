import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const role = localStorage.getItem('role');
  
  return (
    <div className="bg-primary flex flex-col items-center justify-center min-h-screen md:py-2">
      <h2 className="text-2xl font-bold mb-4 text-white">Home Page</h2>
      {role === 'teacher' && (
        <div className="bg-secondary rounded-lg p-16">
          <Link to="/add-question" className="block hover:text-secondary bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-700 shadow-md">Add Question</Link>
          <Link to="/create-test" className="block hover:text-secondary bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-700 shadow-md">Create Test</Link>
          <Link to="/view-submission" className="block hover:text-secondary bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-700 shadow-md">View Submission</Link>
        </div>
      )}
      {role === 'student' && (
        <div className="bg-secondary rounded-lg p-16">
          <Link to="/assigned-tests" className="block hover:text-secondary bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-700 shadow-md">Assigned Tests</Link>
          <Link to="/view-result" className="block hover:text-secondary bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-700 shadow-md">View Result</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
