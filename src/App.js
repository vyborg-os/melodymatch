import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}  />
        <Route path="/match" element={<MatchPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
