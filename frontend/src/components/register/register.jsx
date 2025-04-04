import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../global.css";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stack,
  Link,
  CssBaseline,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '450px',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  borderRadius: '16px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: '100vh'
}));

function Register({ setUser }) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseToast = () => setOpen(false);

  function isPasswordValid(password) {
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /\W|_/.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToastMessage('Passwords do not match!');
      setToastType('error');
      setOpen(true);
      return;
    }

    if (!isPasswordValid(password)) {
      setToastMessage('Use uppercase, lowercase, numbers, and special characters.');
      setToastType('error');
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({ email }));
        setUser({ email });

        setToastMessage('Sign-Up successful, please log in.');
        setToastType('success');
        setOpen(true);
        navigate('/login');
      }
    } catch (error) {
      setToastMessage('Error registering. Please try again.');
      setToastType('error');
      setOpen(true);
    }
  };

  return (
    <div className="font-sans">
    <RegisterContainer>
      <CssBaseline />
      <Card>
        <div className="flex items-center">
          <img src="/icon.png" alt="logo" className="w-10 h-10 mr-1"/>
          <Typography component="h1" variant="subtitle2">
            TaskMaster
          </Typography>
        </div>
        <Typography component="h1" variant="h4" textAlign="left" className="mt-10" style={{ fontWeight: '600' }}>
          Sign Up
        </Typography>


        <Box component="form" onSubmit={handleSubmit} noValidate
             sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <TextField label="Email" type="email" required fullWidth value={email}
                     onChange={(e) => setEmail(e.target.value)}/>
          <TextField label="Password" type="password" required fullWidth value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
          <TextField label="Confirm Password" type="password" required fullWidth value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}/>
          <Button type="submit" fullWidth variant="contained"
           sx={{
                      textTransform: "none",
                      borderColor: "#F8C794",
                      transition: "all 0.3s ease",
                        backgroundColor: "#F8C794",
                      "&:hover": { backgroundColor: "#e0a877" },
                      color: "#000"
          }}
          >
            Sign Up
          </Button>
        </Box>
        <Typography textAlign="center">
          Already have an account? <Link href={"/login"}>Log in</Link>
        </Typography>
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toastType}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </RegisterContainer>
      </div>
  );
}

export default Register;
