import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeacherTestDetailPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8501/test/tests/${testId}`);
        setTest(response.data);

        const studentPromises = response.data.assignedStudents.map(async (student) => {
          const studentDetails = await axios.get(`http://localhost:8501/user/getdetails/${student.studentId}`);
          return {
            ...studentDetails.data,
            submissionStatus: student.submissionStatus,
          };
        });

        const studentDetailsList = await Promise.all(studentPromises);
        setStudents(studentDetailsList);
      } catch (error) {
        console.error('Error fetching test or students:', error);
      }
    };
    fetchTest();
  }, [testId]);

  return (
    <div className="p-4 bg-primary flex flex-col h-screen items-center justify-center text-white shadow-md" >
      <h2 className="text-2xl font-bold mb-4">{test?.title}</h2>
      <p className="mb-4">{test?.description}</p>
      <h3 className="text-xl font-bold mb-2">Assigned Students</h3>
      {students.map((student) => (
        <div key={student._id} className="mb-2 bg-secondary p-4 items-center justify-center rounded-lg flex flex-col w-2/6">
          {student.submissionStatus ? (
            <button
              onClick={() => (window.location.href = `/teacher/test/${testId}/student/${student.username}`)}
              className="bg-sky-500 text-secondary w-5/6 flex items-center justify-center hover:bg-sky-600 hover:text-secondary rounded-lg px-3 py-1"
            >
              {student.fullName}
            </button>
          ) : (
            <p>
              {student.fullName} -{' '}
              <span className="text-red-500">Not submitted</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeacherTestDetailPage;
