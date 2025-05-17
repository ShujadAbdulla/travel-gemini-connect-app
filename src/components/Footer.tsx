
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-careblue-600 font-bold text-xl">Care</span>
              <span className="text-careteal-600 font-bold text-xl">Connect</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting patients with care services and transportation solutions.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
              <div className="h-8 w-8 rounded-full bg-careblue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-careblue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4.25v15.5A2.25 2.25 0 0119.75 22H4.25A2.25 2.25 0 012 19.75V4.25A2.25 2.25 0 014.25 2h15.5A2.25 2.25 0 0122 4.25zM8.25 18.5V9.5H5.5v9h2.75zm-1.5-10.25c.97 0 1.75-.78 1.75-1.75s-.78-1.75-1.75-1.75-1.75.78-1.75 1.75.78 1.75 1.75 1.75zm11 10.25V13c0-2.28-.5-4-3.25-4-1.31 0-2.19.72-2.55 1.4h-.03V9.5H9.25v9h2.75v-4.45c0-1.16.22-2.27 1.64-2.27 1.4 0 1.42 1.31 1.42 2.35v4.37h2.69z"></path>
                </svg>
              </div>
              <div className="h-8 w-8 rounded-full bg-careblue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-careblue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.32-.62 1.1-1.1 1.75-1.1s1.25.48 1.57 1.1c.38-.63 1.09-1.1 1.93-1.1.7 0 1.2.32 1.5.77.3.45.5.98.5 1.53v3.7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3z"></path>
                </svg>
              </div>
              <div className="h-8 w-8 rounded-full bg-careblue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-careblue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.48.41-2.86 1.12-4.06.22.07.45.11.69.11 1.13 0 2.09-.75 2.39-1.78.9.31 1.87.48 2.87.48 3.95 0 7.25-2.8 7.93-6.62C20.43 5.19 22 8.39 22 12c0 4.41-3.59 8-8 8z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-careblue-600">
                  Medical Transport
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-careblue-600">
                  Non-Medical Transport
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-careblue-600">
                  Care Assistance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-careblue-600">
                  AI Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-careblue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-careblue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-careblue-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-careblue-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-careblue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-careblue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-600 hover:text-careblue-600">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-careblue-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CareConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
