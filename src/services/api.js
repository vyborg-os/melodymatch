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

// export const registerUser = async (userData) => {
//     try {
//       const response = await axios.post(`${API_URL}/api/users`, userData);
//       return response.data;
//     } catch (error) {
//       console.error("Error registering user:", error);
//       throw error;
//     }
//   };

export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/users`, userData);
      return response.data;
    } catch (error) {
      // Log the error and return a structured response
      console.error("Error registering user:", error.response ? error.response.data : error.message);
      return { error: error.response ? error.response.data.error : 'An unexpected error occurred' };
    }
  };
  
export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const getMatches = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error;
    }
};