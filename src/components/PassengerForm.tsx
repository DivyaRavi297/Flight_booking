import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface PassengerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PassengerFormProps {
  formData: PassengerFormData;
  onChange: (data: PassengerFormData) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ ...formData, email: e.target.value })}
            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ ...formData, phone: e.target.value })}
            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;