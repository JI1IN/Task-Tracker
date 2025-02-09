import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheet.css'

function Login() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      const response = await axios.post(`${API_BASE_URL}/login`, {email : email, password : password});
      localStorage.setItem('user', JSON.stringify({ email }));
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-900">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#F8C794] text-black-900 font-bold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
