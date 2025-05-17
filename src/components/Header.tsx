
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-careblue-600 font-bold text-2xl">Care</span>
          <span className="text-careteal-600 font-bold text-2xl">Connect</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-careblue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-careblue-600 font-medium">Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-careblue-600 font-medium">Services</Link>
          <Link to="/transport" className="text-gray-600 hover:text-careblue-600 font-medium">Transport</Link>
          <Link to="/ai-assistant" className="text-gray-600 hover:text-careblue-600 font-medium">AI Assistant</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-careblue-600 font-medium">Dashboard</Link>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-careblue-500 text-careblue-600 hover:bg-careblue-50"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate('/login')}
                variant="outline" 
                className="border-careblue-500 text-careblue-600 hover:bg-careblue-50"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-careblue-600 hover:bg-careblue-700 text-white"
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-600 py-2 hover:text-careblue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-gray-600 py-2 hover:text-careblue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/transport" 
              className="text-gray-600 py-2 hover:text-careblue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Transport
            </Link>
            <Link 
              to="/ai-assistant" 
              className="text-gray-600 py-2 hover:text-careblue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 py-2 hover:text-careblue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  className="border-careblue-500 text-careblue-600 hover:bg-careblue-50 w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  variant="outline" 
                  className="border-careblue-500 text-careblue-600 hover:bg-careblue-50 w-full"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="bg-careblue-600 hover:bg-careblue-700 text-white w-full"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
