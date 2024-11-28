import express from 'express';
import Flight from '../models/Flight.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all flights with filters
router.get('/', async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      passengers,
      class: seatClass
    } = req.query;

    const query = {};
    if (from) query['departure.city'] = new RegExp(from, 'i');
    if (to) query['arrival.city'] = new RegExp(to, 'i');
    if (date) {
      const searchDate = new Date(date);
      query['departure.time'] = {
        $gte: searchDate,
        $lt: new Date(searchDate.setDate(searchDate.getDate() + 1))
      };
    }

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights' });
  }
});

// Get flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight' });
  }
});

export default router;