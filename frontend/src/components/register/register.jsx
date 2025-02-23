import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import '../global.css';

function Register() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseToast = () => {
    setOpen(false);
  };

  function isPasswordValid(password) {
    return password.length >= 8
      && /[a-z]/g.test(password)
      && /[A-Z]/g.test(password)
      && /[0-9]/g.test(password)
      && /\W|_/g.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (isPasswordValid(password)) {
        const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
        if (response.status === 200) {
          navigate('/login');
          setToastMessage('Please combine uppercase, lowercase and special characters for your password.');
          setToastType('error');
          setOpen(true);
        }
      } else {
        setToastMessage('Please combine uppercase, lowercase and special characters for your password.');
        setToastType('error');
        setOpen(true);
      }
    } else {
      setToastMessage('Passwords do not match!');
      setToastType('error');
      setOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
          <h2 className="text-xl text-gray-400 text-center mb-12">Let's get started</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    borderColor: 'black',
                  },
                }}
              />
            </div>
            <div className="mb-4 w-full">
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    borderColor: 'black',
                  },
                }}
              />
            </div>
            <div className="mb-4 w-full">
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    borderColor: 'black',
                  },
                }}
              />
            </div>
            <div className="w-full flex justify-center">
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
                Sign Up
              </Button>
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
        <h1 className="p-10 mr-12 font-semibold text-4xl flex justify-end">Sign Up to TaskMaster</h1>
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toastType} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
