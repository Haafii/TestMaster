import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    try {
      // Replace with your actual registration logic (e.g., API call to your backend)
      const response = await fetch('http://localhost:8501/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username, password, role }),
      });
      if (!response.ok) {
        throw new Error('Registration failed'); // Or handle different errors based on response status
      } else {
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); // Reset loading state
  };
  return (
    <div className="bg-primary flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex items-center w-full px-2 md:px-20">
        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
          <p className='text-6xl text-blue-500 font-bold'>TestMaster</p>
          {/* <p className='font-medium text-lg leading-1 text-white'>Stop the pollution. Be part of the solution.</p> */}
        </div>
        <div className="bg-secondary rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
          <h2 className='p-3 text-3xl font-bold text-white'>TestMaster</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <h3 className='text-xl font-semibold text-white pt-2'>Create Account</h3>
          <form onSubmit={handleRegister}>
            <div className='flex flex-col items-center justify-center'>
              <input
                type='text'
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type='text'
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type='password'
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <select
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {error && <div className='text-red-600 text-sm '>{error}</div>}
              <button
                type="submit"
                className='rounded-2xl my-4 text-white bg-sky-500 w-full px-6 py-2 shadow-md hover:text-secondary hover:bg-sky-600 transition duration-200 ease-in'
                disabled={isLoading} // Disable the button during loading
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div> // Loading spinner
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <p className='text-white mt-4 text-sm'>Already have an account?</p>
          <Link
            className='text-white mb-4 text-sm font-medium cursor-pointer'
            to="/"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  )


};

export default Register;
