import { useState } from 'react';
import { createBooking } from '../services/api';

interface BookingData {
  flightId: string;
  passengers: Array<{
    firstName: string;
    lastName: string;
    seatNumber: string;
  }>;
  seatNumbers: string[];
}

export const useFlightBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookFlight = async (bookingData: BookingData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createBooking(bookingData);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    bookFlight,
    loading,
    error,
  };
};