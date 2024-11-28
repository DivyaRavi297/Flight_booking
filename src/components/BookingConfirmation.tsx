import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Download } from 'lucide-react';

interface BookingConfirmationProps {
  bookingId: string;
  flightDetails: any;
  passengers: any[];
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingId,
  flightDetails,
  passengers,
}) => {
  const handleDownloadTicket = () => {
    // Implementation for ticket download
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">Booking ID: {bookingId}</p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <h3 className="font-semibold mb-3">Flight Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Flight Number</p>
            <p className="font-medium">{flightDetails.flightNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-medium">
              {new Date(flightDetails.departure.time).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-medium">{flightDetails.departure.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-medium">{flightDetails.arrival.city}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Passenger Details</h3>
        {passengers.map((passenger, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-md mb-2">
            <p className="font-medium">
              {passenger.firstName} {passenger.lastName}
            </p>
            <p className="text-sm text-gray-600">Seat: {passenger.seatNumber}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Link
          to="/my-bookings"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Bookings
        </Link>
        <button
          onClick={handleDownloadTicket}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          <span>Download Ticket</span>
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;