import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      // Make an API call to the backend to login using Axios
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      console.log(response.data);
      // If login is successful, store the JWT token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);

      // Redirect to home page after successful login
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific error response from server
        setError(error.response.data.message || 'Invalid credentials.');
      } else {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex flex-col md:flex-row justify-center items-center md:gap-32 gap-10">
      <div>
        <div className="flex flex-col items-center md:text-2xl text-xl gap-2 font-bold">
          <img src={logo} alt="DealsDray" className="md:w-[100px] w-[70px]" />
          DealsDray
        </div>
      </div>
      <form onSubmit={handleSubmit} className="md:w-[400px] w-[80%] shadow-lg shadow-red-300 rounded-lg p-[20px] space-y-6">
        <h1 className="font-bold md:text-3xl text-2xl mb-[30px]">Login</h1>
        {error && <p className="text-red-500">{error}</p>}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold text-sm mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
            className="w-[100%] border border-gray-500 p-2 rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-semibold text-sm mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-[100%] border border-gray-500 p-2 rounded-md"
            required
          />
        </div>

        <button className="w-[100%] bg-red-600 p-2 rounded-md text-white">Login</button>
        <p className="text-sm text-gray-500">Don't have an account? <a href="/register" className="text-black font-semibold">Register here</a></p>
      </form>
    </div>
  );
};

export default Login;
