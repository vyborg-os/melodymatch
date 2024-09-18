import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import logo from '../assets/logo2.png'; 
import {
    toast,
    ToastContainer
  } from 'react-toastify'
  
import { TextField, Button, Container, Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      localStorage.setItem('token', token);
        // alert(`Welcome ${user.name}`);
        toast.success(`Welcome ${user.name}`)
    //   useNavigate('/match');
       navigate('/dashboard');
    } catch (error) {
      // alert('Login failed');
      toast.error('Wrong Credentials')
    }
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="h5" gutterBottom>
    <center><img src={logo} alt="Logo" width="200" /></center> Login Now
    </Typography>
      <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
       <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
    <ToastContainer />
    <a href="/register" style={{textDecoration: '0', float: 'right', paddingTop: '20px'}}>New User? Signup</a>
    
  </Container>
  );
};

export default Login;
