import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, Clock, Users } from 'lucide-react';

// Mock data for demonstration
const mockFlights = [
  {
    id: 1,
    airline: 'SkyWings Airlines',
    flightNumber: 'SW123',
    departure: '08:00 AM',
    arrival: '11:30 AM',
    duration: '3h 30m',
    price: 299,
    stops: 0,
  },
  {
    id: 2,
    airline: 'Global Airways',
    flightNumber: 'GA456',
    departure: '10:15 AM',
    arrival: '02:45 PM',
    duration: '4h 30m',
    price: 249,
    stops: 1,
  },
  // Add more mock flights as needed
];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-semibold">{searchParams.from || 'New York'}</p>
            </div>
            <Plane className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">To</p>
              <p className="font-semibold">{searchParams.to || 'Paris'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{searchParams.departDate || '2024-04-10'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="font-semibold">{searchParams.passengers || '1'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="font-semibold capitalize">{searchParams.class || 'Economy'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Sort by Price</option>
            <option>Sort by Duration</option>
            <option>Sort by Departure</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>All Airlines</option>
            <option>SkyWings Airlines</option>
            <option>Global Airways</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Any Stops</option>
            <option>Non-stop only</option>
            <option>1 stop max</option>
          </select>
        </div>
      </div>

      {/* Flight Results */}
      <div className="space-y-6">
        {mockFlights.map((flight) => (
          <div key={flight.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{flight.airline}</h3>
                <p className="text-gray-600">Flight {flight.flightNumber}</p>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="font-semibold text-lg">{flight.departure}</p>
                  <p className="text-sm text-gray-600">{searchParams.from || 'New York'}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">{flight.duration}</p>
                  <p className="text-xs text-gray-500">{flight.stops} stop{flight.stops !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{flight.arrival}</p>
                  <p className="text-sm text-gray-600">{searchParams.to || 'Paris'}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                <button
                  onClick={() => navigate(`/booking/${flight.id}`)}
                  className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;