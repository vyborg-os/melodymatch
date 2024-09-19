// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import load from '../assets/3.gif'; 
import { Button, Modal, TextField, Box } from '@mui/material';
import {
    toast,
    ToastContainer
  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);  // State to handle modal
  const [newPreferences, setNewPreferences] = useState('');  // New preferences

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

  const handleOpenModal = () => {
    setNewPreferences(userData?.preferences.join(', ') || ''); // Populate input with user's current preferences
    setOpenModal(true);
  };
  
  const handleCloseModal = () => setOpenModal(false);

  const handleUpdatePreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: token },
      };
      await axios.put('http://localhost:5000/api/preferences', { preferences: newPreferences }, config);
      
      // Update the preferences in the profile
      setUserData((prevUser) => ({ ...prevUser, preferences: newPreferences.split(',') }));
      toast.success('Preferences Updated')
      // Close the modal after updating
      handleCloseModal();
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };
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
        <p><strong>Preferences:</strong> {userData.preferences.join(', ')}</p>
        <Button variant="contained" color="primary" onClick={handleOpenModal} fullWidth>
        Update
      </Button>
      </div>
       {/* Modal for updating preferences */}
       <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h3>Update Preferences</h3>
            <TextField
              fullWidth
              label="Preferences (comma separated)"
              value={newPreferences}
              onChange={(e) => setNewPreferences(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleUpdatePreferences}>
              Save Changes
            </Button>
          </Box>
        </Modal>
        <ToastContainer />
    </div>
    </>
  );
};

export default Profile;
