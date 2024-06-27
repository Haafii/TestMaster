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
    <div className="min-h-screen bg-primary py-8 flex flex-col items-center justify-center">
      <div className="w-1/2  mx-auto bg-secondary shadow-lg rounded-lg p-6 text-white">
        <h1 className="text-2xl flex items-center justify-center font-bold mb-6">Submitted Tests</h1>
        <ul>
          {submissions.map(submission => (
            <li key={submission._id} className="mb-4 p-4 border rounded-lg bg-secondary">
              <p className="text-xl font-semibold text-white">Title: {submission.title}</p>
              <p className="text-lg">
                Score: <span className={submission.score ? 'text-green-600' : 'text-red-600'}>
                  {submission.score ?? 'Evaluating'}
                </span>
              </p>
              <p className="text-md text-gray-300">Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentSubmissions;
