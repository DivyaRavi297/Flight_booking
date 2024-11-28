import React from 'react';

interface FlightSummaryProps {
  flightNumber: string;
  departureTime: string;
  departureCity: string;
  arrivalCity: string;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({
  flightNumber,
  departureTime,
  departureCity,
  arrivalCity,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-8">
      <h3 className="font-semibold mb-4">Flight Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Flight</p>
          <p className="font-semibold">{flightNumber}</p>
        </div>
        <div>
          <p className="text-gray-600">Date</p>
          <p className="font-semibold">
            {new Date(departureTime).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-gray-600">From</p>
          <p className="font-semibold">{departureCity}</p>
        </div>
        <div>
          <p className="text-gray-600">To</p>
          <p className="font-semibold">{arrivalCity}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;