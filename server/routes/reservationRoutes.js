const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservations.js');

// GET /api/reservations
// Fetch reservations based on parkId and date
router.get('/', async (req, res) => {
  const { parkId, date } = req.query;
  try {
    // Build query dynamically: if no filters are provided, it fetches everything.
    const query = {};
    if (parkId) query.parkId = parkId;
    if (date) query.date = date;

    console.log('Executing query:', query);

    const reservations = await Reservation.find(query);

    console.log('Reservations found:', reservations);
    
    console.log(reservations);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
});

// @route POST /api/reservations
// @desc Save a new reservation
router.post('/', async (req, res) => {
  const newReservation = new Reservation(req.body);
  try {
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error saving reservation', error });
  }
});

module.exports = router;