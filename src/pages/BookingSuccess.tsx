
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const BookingSuccess = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get booking details
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  
  // If no booking is found or user is not logged in, redirect
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view booking details");
      navigate("/login");
      return;
    }
    
    if (!booking) {
      toast.error("Booking not found");
      navigate("/dashboard");
    }
  }, [booking, user, navigate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!booking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading booking details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-careblue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-careblue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your transportation has been successfully booked and confirmed.
            </p>
            
            <div className="border border-gray-200 rounded-lg p-6 text-left mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Booking Details</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-medium capitalize">{booking.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transport Type:</span>
                  <span className="font-medium capitalize">{booking.transportType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(booking.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{booking.time}</span>
                </div>
                
                <div className="border-t border-gray-200 my-3 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-medium text-right">{booking.pickupAddress}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Dropoff:</span>
                    <span className="font-medium text-right">{booking.dropoffAddress}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-3 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium text-green-600">Paid</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-careblue-600">${booking.price}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-careblue-600 hover:bg-careblue-700 text-white w-full"
              >
                View All Bookings
              </Button>
              
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your registered email address.
              </p>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Need help with your booking?
                </p>
                <Link to="/ai-assistant" className="text-careblue-600 hover:text-careblue-500 font-medium text-sm">
                  Ask our AI Assistant for help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSuccess;
