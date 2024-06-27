import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Question Type</label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="w-full mt-1 p-2 border rounded">
          <option value="multiple-choice">Multiple Choice</option>
          <option value="short-answer">Short Answer</option>
          <option value="essay">Essay</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Question Text</label>
        <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>
      {questionType === 'multiple-choice' && (
        <div>
          <label className="block text-gray-700">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full mt-1 p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Save Question</button>
    </div>
  );
};

export default AddQuestion;
