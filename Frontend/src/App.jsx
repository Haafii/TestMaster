import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AddQuestion from './components/AddQuestion';
import CreateTest from './components/CreateTest';
import AssignedTests from './components/AssignedTests';
import TestDetailPage from './components/TestDetailPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
