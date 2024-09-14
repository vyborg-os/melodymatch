// import axios from 'axios';

// // Function to get a welcome message from the backend
// export const getWelcomeMessage = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000');
//     return response.data.message; // Assuming the backend returns { message: "Welcome" }
//   } catch (error) {
//     console.error('Error fetching the welcome message:', error);
//     return 'Error fetching data';
//   }
// };

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getWelcomeMessage = async () => {
   const response = await axios.get(`${API_URL}/`);
   return response.data;
};
