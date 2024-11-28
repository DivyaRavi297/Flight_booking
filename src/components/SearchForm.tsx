import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

const SearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search', { state: formData });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>From</span>
          </label>
          <input
            type="text"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            placeholder="Departure City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>To</span>
          </label>
          <input
            type="text"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            placeholder="Destination City"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Depart</span>
          </label>
          <input
            type="date"
            value={formData.departDate}
            onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Return</span>
          </label>
          <input
            type="date"
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Passengers</span>
          </label>
          <select
            value={formData.passengers}
            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} Passenger{num !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <span>Class</span>
          </label>
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
      >
        Search Flights
      </button>
    </form>
  );
};

export default SearchForm;