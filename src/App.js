import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantList from './pages/RestaurantList';
import WaitingForm from './pages/WaitingForm';
import WaitingComplete from './pages/WaitingComplete';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/waiting" element={<WaitingForm />} />
        <Route path="/complete" element={<WaitingComplete />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;