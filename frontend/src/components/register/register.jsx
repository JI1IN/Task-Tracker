import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheet.css';

function Register() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
      if (response.status === 200) {
        navigate('/tasktracker');
      }
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-center">Sign in</h2>
          <h2 className="text-xl text-gray-400 text-center mb-12">Let's get started</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-gray-900">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-black rounded-xl focus:border-[#F8C794] focus:outline-none transition-colors duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-gray-900">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border border-black rounded-xl focus:border-[#F8C794] focus:outline-none transition-colors duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="confirmPassword" className="block text-gray-900">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-3 mt-2 border border-black rounded-xl focus:border-[#F8C794] focus:outline-none transition-colors duration-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-1/2 mt-10 bg-[#F8C794] text-black-900 font-bold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          {/* Account switch link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?
              <a href="/login" className="text-[#F8C794] font-semibold"> Log in</a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 bg-[#FFF2D7]">
        <h1 className="p-10 mr-12 font-bold flex justify-end">TaskMaster</h1>
        <h1 className="p-10 mr-12 font-semibold text-4xl flex justify-end">Sign in to TaskMaster</h1>
      </div>
    </div>
  );
}

export default Register;
