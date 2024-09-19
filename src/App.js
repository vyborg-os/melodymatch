import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MatchPage from './pages/MatchPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LogOutPage from './pages/LogOutPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import './App.css';

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/navbar' element={<Navbar />} />
        
        {/* Protected route */}
        <Route 
          path="/match" 
          element={
            <ProtectedRoute>
              <MatchPage />
            </ProtectedRoute>
          }
        />
        <Route path='/profile' element={ <ProtectedRoute>
          <Profile />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
