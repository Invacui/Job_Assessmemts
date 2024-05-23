import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Hero from './Pages/Hero';
import InvalidUser from './Pages/InvalidUser';
import Auth from './Pages/Auth';
import ProtectedRoute from './services/ProtectedRoutes';
import './index.css';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Hero} />} />
      <Route path="*" element={<InvalidUser />} />
    </Routes>
  );
}

export default App;