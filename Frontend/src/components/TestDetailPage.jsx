import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TestDetailPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8501/test/tests/${testId}`);
        setTest(response.data);
        console.log(test)
        const questionPromises = response.data.questions.map(qId =>
          axios.get(`http://localhost:8501/question/get/${qId}`)
        );
        const questionResponses = await Promise.all(questionPromises);
        setQuestions(questionResponses.map(res => res.data));
      } catch (error) {
        console.error('Error fetching test or questions:', error);
      }
    };
    fetchTest();
  }, [testId]);

  const handleChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    const submissionData = {
      student: username,
      test: testId,
      answers: Object.keys(answers).map(qId => ({
        question: qId,
        answerText: answers[qId],
      })),
    };
    try {
      await axios.post('http://localhost:8501/submit/testsubmit', submissionData);
      alert('Test submitted successfully');
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">{test?.title}</h2>
      {questions.map(question => (
        <div key={question._id} className="mb-4">
          <p className="font-bold">{question.questionText}</p>
          {question.questionType === 'multiple-choice' ? (
            question.options.map((option, index) => (
              <div key={index} className="ml-4">
                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  onChange={(e) => handleChange(question._id, e.target.value)}
                />
                <label className="ml-2">{option}</label>
              </div>
            ))
          ) : (
            <textarea
              className="w-full mt-1 p-2 border rounded"
              onChange={(e) => handleChange(question._id, e.target.value)}
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default TestDetailPage;
