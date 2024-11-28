import express from 'express';
import { auth } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { flightId, passengers, seatNumbers } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Check seat availability
    const unavailableSeats = seatNumbers.filter(
      seatNum => !flight.seats.find(
        seat => seat.number === seatNum && seat.available
      )
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: `Seats ${unavailableSeats.join(', ')} are not available`
      });
    }

    // Create booking
    const booking = new Booking({
      user: req.userId,
      flight: flightId,
      passengers,
      totalAmount: flight.price * passengers.length,
    });

    await booking.save();

    // Update seat availability
    await Flight.findByIdAndUpdate(flightId, {
      $set: {
        'seats.$[elem].available': false
      }
    }, {
      arrayFilters: [{ 'elem.number': { $in: seatNumbers } }],
      new: true
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('flight')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalAmount * 100, // Convert to cents
      currency: 'usd',
      metadata: { bookingId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent' });
  }
});

// Send booking confirmation email
const sendConfirmationEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    // Configure email transport
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: booking.user.email,
    subject: 'Booking Confirmation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Your booking has been confirmed!</p>
      <p>Booking ID: ${booking._id}</p>
      <!-- Add more booking details -->
    `
  });
};

export default router;