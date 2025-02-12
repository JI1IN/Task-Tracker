import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheet.css';

function Login() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      localStorage.setItem('user', JSON.stringify({ email }));
      // You can redirect to another page after successful login, for example:
      navigate('/tasktracker');
    }
  };

  return (
    <div className="flex min-h-screen">

      <div className="hidden lg:block lg:w-1/2 bg-[#FFF2D7]">
        <h1 className="p-10 ml-12 font-bold">TaskMaster</h1>
        <h1 className="p-10 ml-12 font-semibold text-4xl">Log in to TaskMaster</h1>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          <h2 className="text-xl text-gray-400 text-center mb-12">Welcome to TaskMaster</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-gray-900">Email</label>
              <input
                  type="email"
                  id="email"
                  className="w-full p-3 mt-2 border border-black rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-gray-900">Password</label>
              <input
                  type="password"
                  id="password"
                  className="w-full p-3 mt-2 border border-black rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-center mt-10">
              <button
                  type="submit"
                  className="w-1/2 text-center bg-[#F8C794] text-black-900 font-bold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
