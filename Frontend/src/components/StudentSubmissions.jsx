import React, { useEffect, useState } from 'react';

const StudentSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch(`http://localhost:8501/submit/submissions/${username}`)
      .then(response => response.json())
      .then(data => {
        const testPromises = data.map(submission => 
          fetch(`http://localhost:8501/test/tests/${submission.test}`)
            .then(response => response.json())
            .then(test => ({
              ...test,
              score: submission.score,
              submittedAt: submission.submittedAt
            }))
        );
        Promise.all(testPromises).then(data => setSubmissions(data));
      })
      .catch(error => console.error('Error fetching submissions:', error));
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Submitted Tests</h1>
        <ul>
          {submissions.map(submission => (
            <li key={submission._id} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <p className="text-xl font-semibold text-gray-800">Title: {submission.title}</p>
              <p className="text-lg text-gray-700">
                Score: <span className={submission.score ? 'text-green-600' : 'text-red-600'}>
                  {submission.score ?? 'Evaluating'}
                </span>
              </p>
              <p className="text-md text-gray-600">Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentSubmissions;
