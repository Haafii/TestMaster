import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const data = { questionType, questionText, options: questionType === 'multiple-choice' ? options : [] };
    try {
      await axios.post('http://localhost:8501/question/create', data);
      alert('Question added successfully');
    } catch (error) {
      alert('Error adding question');
    }
  };

  const HandleBack = () =>{
    navigate('/home');
  }

  return (
    <div className="bg-primary flex flex-col items-center justify-center min-h-screen md:py-2">
      <h2 className="text-2xl font-bold mb-4 text-white">Add Question</h2>
      <div className="bg-secondary justify-center rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
        <div className="mb-4">
          <label className="block text-white">Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full  mt-1 p-2 border rounded text-secondary"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="short-answer">Short Answer</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white">Question Text</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full mt-1 p-10  border rounded text-secondary"
          />
        </div>
        {questionType === 'multiple-choice' && (
          <div>
            <label className="block text-white">Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full items-center justify-center flex flex-col mt-1 p-2 border rounded mb-2 text-secondary"
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
        )}
        <div className='gap-4 flex mb-4'>
        <button
          onClick={handleSubmit}
          className="bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-600"
        >
          Save Question
        </button>
        <button
          onClick={HandleBack}
          className="bg-sky-500 text-white py-2 px-4 rounded mt-4 hover:bg-sky-600"
        >
          Back
        </button>
        </div>
        
      </div>

    </div>
  );
};

export default AddQuestion;
