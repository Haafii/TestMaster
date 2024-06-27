// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const HomePage = () => {
//   const [role, setRole] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [newQuestion, setNewQuestion] = useState({
//     questionType: 'multiple-choice',
//     questionText: '',
//     options: ['', '', '', ''],
//   });
//   const [newTest, setNewTest] = useState({
//     title: '',
//     description: '',
//     createdBy: localStorage.getItem('username'),
//     questions: [],
//     assignedStudents: [],
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const username = localStorage.getItem('username');
//     axios.get(`http://localhost:8501/user/getdetails/${username}`)
//       .then(response => {
//         setRole(response.data.role);
//       })
//       .catch(error => {
//         console.error('Error fetching user details:', error);
//         navigate('/login');
//       });

//     axios.get('http://localhost:8501/question/get')
//       .then(response => {
//         setQuestions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching questions:', error);
//       });

//     axios.get('http://localhost:8501/user/students')
//       .then(response => {
//         setStudents(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching students:', error);
//       });
//   }, [navigate]);

//   const handleQuestionChange = (e) => {
//     setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
//   };

//   const handleOptionChange = (index, value) => {
//     const options = [...newQuestion.options];
//     options[index] = value;
//     setNewQuestion({ ...newQuestion, options });
//   };

//   const addQuestion = () => {
//     axios.post('http://localhost:8501/question/create', newQuestion)
//       .then(response => {
//         setQuestions([...questions, response.data]);
//         setNewQuestion({
//           questionType: 'multiple-choice',
//           questionText: '',
//           options: ['', '', '', ''],
//         });
//       })
//       .catch(error => {
//         console.error('Error adding question:', error);
//       });
//   };

//   const handleTestChange = (e) => {
//     setNewTest({ ...newTest, [e.target.name]: e.target.value });
//   };

//   const handleQuestionSelection = (questionId) => {
//     const selectedQuestions = newTest.questions.includes(questionId)
//       ? newTest.questions.filter(id => id !== questionId)
//       : [...newTest.questions, questionId];
//     setNewTest({ ...newTest, questions: selectedQuestions });
//   };

//   const handleStudentSelection = (username) => {
//     const selectedStudents = newTest.assignedStudents.some(student => student.studentId === username)
//       ? newTest.assignedStudents.filter(student => student.studentId !== username)
//       : [...newTest.assignedStudents, { studentId: username, submissionStatus: false }];
//     setNewTest({ ...newTest, assignedStudents: selectedStudents });
//   };

//   const createTest = () => {
//     axios.post('http://localhost:8501/test/create', newTest)
//       .then(response => {
//         console.log('Test created:', response.data);
//         setNewTest({
//           title: '',
//           description: '',
//           createdBy: localStorage.getItem('username'),
//           questions: [],
//           assignedStudents: [],
//         });
//       })
//       .catch(error => {
//         console.error('Error creating test:', error);
//       });
//   };

//   if (role !== 'teacher') {
//     return <div>Unauthorized Access</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Add Question</h2>
//         <div className="mb-4">
//           <label className="block mb-1">Question Type</label>
//           <select
//             name="questionType"
//             value={newQuestion.questionType}
//             onChange={handleQuestionChange}
//             className="border p-2 w-full"
//           >
//             <option value="multiple-choice">Multiple Choice</option>
//             <option value="short-answer">Short Answer</option>
//             <option value="essay">Essay</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1">Question Text</label>
//           <textarea
//             name="questionText"
//             value={newQuestion.questionText}
//             onChange={handleQuestionChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         {newQuestion.questionType === 'multiple-choice' && (
//           <div className="mb-4">
//             {newQuestion.options.map((option, index) => (
//               <div key={index} className="mb-2">
//                 <label className="block mb-1">Option {index + 1}</label>
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   className="border p-2 w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         <button onClick={addQuestion} className="bg-blue-500 text-white p-2 rounded">Save Question</button>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Create Test</h2>
//         <div className="mb-4">
//           <label className="block mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={newTest.title}
//             onChange={handleTestChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1">Description</label>
//           <textarea
//             name="description"
//             value={newTest.description}
//             onChange={handleTestChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Select Questions</h3>
//           {questions.map((question) => (
//             <div key={question._id} className="mb-2">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={newTest.questions.includes(question._id)}
//                   onChange={() => handleQuestionSelection(question._id)}
//                   className="mr-2"
//                 />
//                 {question.questionText}
//               </label>
//             </div>
//           ))}
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Assign Students</h3>
//           {students.map((student) => (
//             <div key={student._id} className="mb-2">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={newTest.assignedStudents.some(s => s.studentId === student.username)}
//                   onChange={() => handleStudentSelection(student.username)}
//                   className="mr-2"
//                 />
//                 {student.fullName}
//               </label>
//             </div>
//           ))}
//         </div>

//         <button onClick={createTest} className="bg-blue-500 text-white p-2 rounded">Save Test</button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


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
        </div>
      )}
      {role === 'student' && (
        <div>
          <Link to="/assigned-tests" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Assigned Tests</Link>
          {/* <Link to="/create-test" className="block bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700">Create Test</Link> */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
