import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import BookingConfirmation from '../components/BookingConfirmation';

const BookingSuccess = () => {
  const location = useLocation();
  const { bookingId, flightDetails, passengers } = location.state || {};

  if (!bookingId || !flightDetails) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BookingConfirmation
        bookingId={bookingId}
        flightDetails={flightDetails}
        passengers={passengers}
      />
    </div>
  );
};

export default BookingSuccess;