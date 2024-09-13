import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getWelcomeMessage = async () => {
   const response = await axios.get(`${API_URL}/`);
   return response.data;
};
