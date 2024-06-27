import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8501/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login Failed');
      }
      localStorage.setItem('username', username);
      const detailsResponse = await fetch(`http://localhost:8501/user/getdetails/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!detailsResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetails = await detailsResponse.json();
      const { role } = userDetails;
      localStorage.setItem('role', role);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
          <h3 className='text-xl font-semibold text-white pt-2'>Welcome Back</h3>
          <form onSubmit={onLogin}>
            <div className='flex flex-col items-center justify-center'>
              <input
                type='text'
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Username'
                onChange={(e) => { setUsername(e.target.value), setError(null), setIsLoading(false) }}
                required
                id="username"
                name="username"
              />
              <input
                type="password"
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-1 focus:shadow-md  focus:outline-none focus:ring-0'
                placeholder='Password'
                id="password"
                name="password"
                onChange={(e) => { setPassword(e.target.value), setError(null), setIsLoading(false) }}
                required
              />
              {error && <div className='text-red-600 text-sm '>{error}</div>}
              <button
                type="submit"
                className='rounded-2xl my-4 text-white bg-sky-500 w-full px-6 py-2 shadow-md hover:text-secondary hover:bg-sky-600 transition duration-200 ease-in'
                disabled={isLoading} // Disable the button during loading
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div> // Loading spinner
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <p className='text-white mt-4 text-sm'>Don't have an account?</p>
          <Link
            className='text-white mb-4 text-sm font-medium cursor-pointer'
            to="/register"
          >
            Create a New Account?
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Login
