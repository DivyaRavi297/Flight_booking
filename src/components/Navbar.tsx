import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import SignInModal from './auth/SignInModal';
import SignUpModal from './auth/SignUpModal';

const Navbar = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSignUpClick = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSignInClick = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">SkyBooker</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              {loading ? (
                <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-md"></div>
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600">
                    My Bookings
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSignInModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignUpClick={handleSignUpClick}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSignInClick={handleSignInClick}
      />
    </>
  );
};

export default Navbar;