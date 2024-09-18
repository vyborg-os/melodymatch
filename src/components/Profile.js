// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import load from '../assets/3.gif'; 
import { TextField, Button, Container, Typography } from '@mui/material';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile information
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token stored in local storage
        const config = {
          headers: {
            'Authorization': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/profile', config);
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <center style={{paddingTop: '70px'}}><img src={load} alt="Loading.." width="200" /></center>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="profile-page" style={{maxWidth: '600px',
        margin: '2rem auto',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
      <h2>My Profile</h2>
      <div className="profile-details" style={{lineHeight: '1.8'}}>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Preferences:</strong> {userData.preferences}</p>
        <Button variant="contained" color="primary" fullWidth>
        Update
      </Button>
      </div>
    </div>
    </>
  );
};

export default Profile;
