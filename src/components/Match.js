import React, { useState } from 'react';
import { getMatches } from '../services/api';
import { TextField, Button, Container, Table } from '@mui/material';
import Navbar from './Navbar';

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

  const handleMatch = async (e) => {
    e.preventDefault();
    const result = await getMatches(email);
    setMatches(result);
  };
  return (
    <>
    {/* Navbar should be rendered here */}
    <Navbar />
    <Container maxWidth="sm">
      <a href="/logout" style={{textDecoration: '0', float: 'right', paddingTop: '20px'}}>Logout</a>
      <h1>Find a Music Match</h1>
      <form onSubmit={handleMatch}>
      <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
         <Button type="submit" variant="contained" color="primary" fullWidth>
         Find Matches
        </Button>
      </form>

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
              {/* You can also include more data about each match here */}
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
