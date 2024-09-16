import React, { useState, useEffect } from 'react';
import { getMatches } from '../services/api';

const Match = () => {
  const [email, setEmail] = useState('');
  const [matches, setMatches] = useState([]);

  const handleMatch = async (e) => {
    e.preventDefault();
    const result = await getMatches(email);
    setMatches(result);
  };

  return (
    <div>
      <h1>Find a Music Match</h1>
      <form onSubmit={handleMatch}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Find Matches</button>
      </form>

      <h3>Matches:</h3>
      <ul>
        {matches.map((match) => (
          <li key={match._id}>{match.name} - Preferences: {match.preferences.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default Match;
