import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { TextField, Button, Container, Typography } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, preferences: preferences.split(',') };
    // await registerUser(userData);
    // alert('User registered successfully');

    const result = await registerUser(userData);

    if (result.error) {
      alert(result.error); // Display the error message in an alert
    } else {
      alert('User registered successfully'); // Optionally display a success message
    }
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="h4" gutterBottom>
      Register
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
  </Container>
  );
};

export default Register;
