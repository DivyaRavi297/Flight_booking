import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import PaymentForm from '../components/PaymentForm';
import FlightSummary from '../components/FlightSummary';
import PassengerForm from '../components/PassengerForm';
import { useFlightData } from '../hooks/useFlightData';
import { useFlightBooking } from '../hooks/useFlightBooking';
import { useAuth } from '../hooks/useAuth';

const Booking = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { flight, loading, error } = useFlightData(flightId);
  const { bookFlight, loading: bookingLoading, error: bookingError } = useFlightBooking();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">Sign In Required</h2>
          <p className="text-yellow-700">Please sign in to continue with your booking.</p>
        </div>
      </div>
    );
  }

  const handleSeatSelect = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const bookingData = {
        flightId: flightId!,
        passengers: [{
          firstName: formData.firstName,
          lastName: formData.lastName,
          seatNumber: selectedSeats[0],
        }],
        seatNumbers: selectedSeats,
      };

      const booking = await bookFlight(bookingData);
      
      navigate('/booking-success', {
        state: {
          bookingId: booking._id,
          flightDetails: flight,
          passengers: bookingData.passengers,
        },
      });
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Flight</h2>
          <p className="text-red-600">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-yellow-800 text-lg font-semibold">Flight Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
        
        <FlightSummary
          flightNumber={flight.flightNumber}
          departureTime={flight.departure.time}
          departureCity={flight.departure.city}
          arrivalCity={flight.arrival.city}
        />

        {bookingError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{bookingError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Select Your Seat</h3>
            <SeatMap
              seats={flight.seats}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
              seatClass="economy"
            />
          </div>

          <PassengerForm
            formData={formData}
            onChange={setFormData}
          />

          <button
            type="submit"
            disabled={selectedSeats.length === 0 || bookingLoading}
            className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold
              ${(selectedSeats.length === 0 || bookingLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;