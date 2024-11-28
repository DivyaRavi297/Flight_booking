import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const searchFlights = async (params: any) => {
  const response = await api.get('/flights', { params });
  return response.data;
};

export const getFlight = async (id: string) => {
  const response = await api.get(`/flights/${id}`);
  return response.data;
};

export const createBooking = async (bookingData: any) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const createPaymentIntent = async (bookingId: string) => {
  const response = await api.post('/bookings/create-payment-intent', { bookingId });
  return response.data;
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const getMyBookings = async () => {
  const response = await api.get('/bookings/my-bookings');
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (profileData: any) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};