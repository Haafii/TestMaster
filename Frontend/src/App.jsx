import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AddQuestion from './components/AddQuestion';
import CreateTest from './components/CreateTest';
import AssignedTests from './components/AssignedTests';
import TestDetailPage from './components/TestDetailPage';
import TeacherTestsPage from './components/TeacherTestsPage';
import TeacherTestDetailPage from './components/TeacherTestDetailPage';
import StudentSubmissionDetailPage from './components/StudentSubmissionDetailPage';
import StudentSubmissions from './components/StudentSubmissions';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/assigned-tests" element={<AssignedTests />} />
          <Route path="/test/:testId"  element={<TestDetailPage />}/>
          <Route path="/view-submission"  element={<TeacherTestsPage />}/>
          <Route path="/teacher/test/:testId" element={<TeacherTestDetailPage />} />
          <Route path="/teacher/test/:testId/student/:studentId" element={<StudentSubmissionDetailPage />} />
          <Route path="/view-result" element={<StudentSubmissions />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
