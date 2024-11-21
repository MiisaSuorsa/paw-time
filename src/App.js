import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ReservationComponent  from './components/Reservation/ReservationComponent.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reservations" element={<ReservationComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
