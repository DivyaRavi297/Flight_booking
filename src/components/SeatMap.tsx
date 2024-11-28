import React from 'react';
import { Check } from 'lucide-react';

interface Seat {
  number: string;
  available: boolean;
  class: string;
}

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: string[];
  onSeatSelect: (seatNumber: string) => void;
  seatClass: string;
}

const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeats,
  onSeatSelect,
  seatClass,
}) => {
  // Filter seats by class and group them into rows
  const filteredSeats = seats.filter((seat) => seat.class.toLowerCase() === seatClass.toLowerCase());
  const rows = groupSeatsIntoRows(filteredSeats);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Plane Header */}
      <div className="relative w-full h-20 bg-gray-200 rounded-t-full mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✈️</span>
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid gap-8">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-4">
            {row.map((seat) => (
              <button
                key={seat.number}
                onClick={() => seat.available && onSeatSelect(seat.number)}
                disabled={!seat.available}
                className={`
                  w-12 h-12 rounded-t-lg border-2 relative
                  ${
                    selectedSeats.includes(seat.number)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : seat.available
                      ? 'bg-white border-gray-300 hover:border-blue-500'
                      : 'bg-gray-200 border-gray-300 cursor-not-allowed'
                  }
                `}
              >
                <span className="text-sm font-medium">{seat.number}</span>
                {selectedSeats.includes(seat.number) && (
                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6" />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded" />
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 border-2 border-blue-600 rounded" />
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded" />
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to group seats into rows
const groupSeatsIntoRows = (seats: Seat[]) => {
  const rows: Seat[][] = [];
  const seatsPerRow = 6;

  for (let i = 0; i < seats.length; i += seatsPerRow) {
    rows.push(seats.slice(i, i + seatsPerRow));
  }

  return rows;
};

export default SeatMap;