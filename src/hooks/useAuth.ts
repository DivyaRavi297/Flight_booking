import { useState, useEffect } from 'react';
import { getProfile } from '../services/api';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: any | null;
  error: string | null;
}

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setState({
          isAuthenticated: false,
          loading: false,
          user: null,
          error: null,
        });
        return;
      }

      try {
        const user = await getProfile();
        setState({
          isAuthenticated: true,
          loading: false,
          user,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('token');
        setState({
          isAuthenticated: false,
          loading: false,
          user: null,
          error: 'Session expired',
        });
      }
    };

    loadUser();
  }, []);

  return state;
};