import React, { useState, useEffect } from 'react';
import { getMatches } from '../services/api'; // Make sure this API call handles the email as a parameter
import { TextField, Button, Container } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';
import load from '../assets/3.gif'; 

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    marginBottom: '15px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    transition: 'transform 0.2s ease-in-out',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  matchName: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0',
    color: '#555',
  },
  preferences: {
    fontSize: '14px',
    color: '#777',
  },
  cardHover: {
    transform: 'scale(1.02)',
  },
};

const Match = () => {
  const [email, setEmail] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Automatically set the email from local storage or authentication token
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
        const config = {
          headers: {
            'Authorization': token,
          },
        };

        // Fetch the user profile to get email
        const response = await axios.get('http://localhost:5000/api/profile', config); 
        setEmail(response.data.email); // Set the email from the user profile
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user email:', err);
        setError('Failed to fetch user details. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserEmail();
  }, []); // Runs only once when the component is mounted

  const handleMatch = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(false);
    try {
      const result = await getMatches(email); // Fetch matches based on the email
      setMatches(result);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to find matches. Please try again later.');
      setLoading(false);
    }
  };
  if (loading) return <center style={{paddingTop: '70px'}}><img src={load} alt="Loading.." width="200" /></center>;
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <h4>Find Users with Preferences Match</h4>

        {/* Display error if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleMatch}>
          {/* Display the user's email, pre-filled */}
          <TextField
            fullWidth
            label="Email"
            value={email} // Pre-populated from user profile
            disabled // Disable the field so users cannot change it manually
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Find Matches
          </Button>
        </form>

        {/* Matches Display */}
        <div style={styles.container}>
          <h3 style={styles.title}>Matches</h3>
          <ul style={styles.list}>
            {matches.map((match) => (
              <li key={match._id} style={styles.listItem}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h4 style={styles.matchName}>{match.name}</h4>
                    <span style={styles.preferences}>
                      Preferences: {match.preferences.join(', ')}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Match;
