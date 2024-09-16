import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem('token');

// ProtectedRoute component for authenticated pages
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route */}
        <Route 
          path="/match" 
          element={
            <ProtectedRoute>
              <MatchPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
