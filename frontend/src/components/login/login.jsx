import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import '../global.css';

function Login() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseToast = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage('Please enter both email and password!');
      setToastType('error');
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({ email }));
        setToastMessage('Login successful!');
        setToastType('success');
        setOpen(true);
        navigate('/tasktracker');
      } else {
        setToastMessage('Invalid email or password!');
        setToastType('error');
        setOpen(true);
      }
    } catch (error) {
      setToastMessage('Error logging in. Please try again.');
      setToastType('error');
      setOpen(true);
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
          <h2 className="text-3xl font-bold text-center">Log in</h2>
          <h2 className="text-xl text-gray-400 text-center mb-12">Welcome to TaskMaster</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F8C794',
                  },
                }}
              />
            </div>
            <div className="mb-4 w-full">
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F8C794',
                  },
                }}
              />
            </div>
            <div className="w-full flex justify-center ">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#F8C794',
                  color: 'black',
                  fontWeight: 'bold',
                  py: 2,
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: '#333',
                    color: '#fff',
                  },
                }}
              >
                Log in
              </Button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?
              <a href="/register" className="text-[#F8C794] font-semibold"> Sign Up</a>
            </p>
          </div>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toastType} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
