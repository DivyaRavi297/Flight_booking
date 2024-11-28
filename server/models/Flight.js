import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
  },
  departure: {
    city: String,
    airport: String,
    time: Date,
  },
  arrival: {
    city: String,
    airport: String,
    time: Date,
  },
  price: {
    type: Number,
    required: true,
  },
  seats: [{
    number: String,
    class: String,
    available: Boolean,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Flight', flightSchema);