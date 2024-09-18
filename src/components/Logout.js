import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast,
    ToastContainer } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user-related data
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Display success message
    toast.success('You have logged out successfully.');

    // Redirect to login page
    setTimeout(() => {
      navigate('/login');
    }, 2000);  // Wait 2 seconds to show toast before redirecting
  }, [navigate]);

  return (
    <div>
      <h4 style={{color: 'red'}}>Logging out...</h4>
      <ToastContainer />
    </div>
   
  );
};

export default Logout;
