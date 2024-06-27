import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentSubmissionDetailPage = () => {
  const { testId, studentId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://localhost:8501/submit/submissions/${testId}/${studentId}`);
        setSubmission(response.data[0]);

        const questionPromises = response.data[0].answers.map(answer =>
          axios.get(`http://localhost:8501/question/get/${answer.question}`)
        );
        const questionResponses = await Promise.all(questionPromises);
        setQuestions(questionResponses.map(res => res.data));
      } catch (error) {
        console.error('Error fetching submission or questions:', error);
      }
    };
    fetchSubmission();
  }, [testId, studentId]);

  const handleSubmitScore = async () => {
    try {
      await axios.put(`http://localhost:8501/submit/submissions/${testId}/${studentId}/mark`, { score });
      alert('Score submitted successfully');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div className="p-4 bg-primary h-screen items-center text-white flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">Submission by {studentId}</h2>
      {questions.map((question, index) => (
        <div key={question._id} className="mb-4 bg-secondary p-4 rounded-lg w-1/2">
          <p className="font-bold">{question.questionType}</p>
          <p className="font-bold">{question.questionText}</p>
          <p>{submission.answers[index].answerText}</p>
        </div>
      ))}
      <div className="mb-4 bg-secondary p-4 rounded-lg w-1/2">
        <label className="block font-bold mb-1 text-white">Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSubmitScore}
        className="bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-600"
      >
        Submit Score
      </button>
    </div>
  );
};

export default StudentSubmissionDetailPage;
