import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/api';
import logo from '../assets/logo2.png'; 
import { TextField, Button, Container, Typography } from '@mui/material';
import { BrowserRouter as  Navigate } from 'react-router-dom';
import {
  toast,
  ToastContainer
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, preferences: preferences.split(',') };
    // await registerUser(userData);
    // alert('User registered successfully');

    const result = await registerUser(userData);

    if (result.error) {
      // alert(result.error); // Display the error message in an alert
      toast.error(result.error);
    } else {
      toast.success('User registered successfully'); 
      //<Navigate to="/login" replace />
      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    }
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="h5" gutterBottom>
    <center><img src={logo} alt="Logo" width="200" /></center> Register
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
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
      <TextField
        fullWidth
        label="Music Preferences (comma separated)"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
    <ToastContainer />
    <a href="/login" style={{textDecoration: '0', float: 'right', paddingTop: '20px'}}>Already a User? Login</a>
  </Container>
  );
};

export default Register;
