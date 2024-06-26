import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchQuestionsAndStudents = async () => {
      try {
        const questionsRes = await axios.get('http://localhost:8501/question/get');
        setQuestions(questionsRes.data);

        const studentsRes = await axios.get('http://localhost:8501/user/students');
        setStudents(studentsRes.data);
      } catch (error) {
        console.error('Error fetching questions or students');
      }
    };
    fetchQuestionsAndStudents();
  }, []);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      createdBy: username,
      questions: selectedQuestions,
      assignedStudents: selectedStudents.map(studentId => ({ studentId, submissionStatus: false }))
    };
    try {
      await axios.post('http://localhost:8501/test/create', data);
      alert('Test created successfully');
    } catch (error) {
      alert('Error creating test');
    }
  };

  return (
    <div className="p-4 flex flex-col min-h-screen md:py-2 bg-primary shadow-md ">
      <h2 className="text-2xl font-bold mb-4 text-white">Create Test</h2>
      <div className="mb-4">
        <label className="block text-white">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-white">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-white">Select Questions</label>
        {questions.map(question => (
          <div key={question._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={question._id}
              onChange={(e) => {
                const { checked, value } = e.target;
                setSelectedQuestions(prev =>
                  checked ? [...prev, value] : prev.filter(id => id !== value)
                );
              }}
              className="mr-2"
            />
            <span className="text-white">{question.questionText}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-white">Select Students</label>
        {students.map(student => (
          <div key={student._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={student.username}
              onChange={(e) => {
                const { checked, value } = e.target;
                setSelectedStudents(prev =>
                  checked ? [...prev, value] : prev.filter(id => id !== value)
                );
              }}
              className="mr-2"
            />
            <span className="text-white">{student.fullName}</span>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="bg-sky-500 text-secondary py-2 px-4 rounded mt-4 hover:bg-sky-600">Save Test</button>
    </div>
  );
};

export default CreateTest;
