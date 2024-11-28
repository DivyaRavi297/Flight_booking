import { useState, useEffect } from 'react';
import { getFlight } from '../services/api';

interface FlightData {
  flightNumber: string;
  airline: string;
  departure: {
    city: string;
    airport: string;
    time: string;
  };
  arrival: {
    city: string;
    airport: string;
    time: string;
  };
  price: number;
  seats: Array<{
    number: string;
    class: string;
    available: boolean;
  }>;
}

interface UseFlightDataReturn {
  flight: FlightData | null;
  loading: boolean;
  error: Error | null;
}

export const useFlightData = (flightId: string | undefined): UseFlightDataReturn => {
  const [flight, setFlight] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFlight = async () => {
      if (!flightId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getFlight(flightId);
        setFlight(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load flight data'));
      } finally {
        setLoading(false);
      }
    };

    loadFlight();
  }, [flightId]);

  return { flight, loading, error };
};