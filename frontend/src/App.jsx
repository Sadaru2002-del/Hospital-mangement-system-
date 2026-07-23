import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import DigitalPrescription from './pages/DigitalPrescription';

/**
 * App Component
 * 
 * The entry point of the React application. 
 * This component sets up the routing configuration.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/prescription" element={<DigitalPrescription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;