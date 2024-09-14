import React, { useEffect, useState } from 'react';
import { getWelcomeMessage } from '../services/api';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const result = await getWelcomeMessage();
      setMessage(result);
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Welcome to MelodyMatch</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
