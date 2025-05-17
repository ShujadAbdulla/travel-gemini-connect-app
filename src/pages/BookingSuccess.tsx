
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useBooking } from '@/contexts/BookingContext';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useBooking();
  const navigate = useNavigate();
  
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  
  useEffect(() => {
    if (!booking) {
      navigate('/dashboard');
    }
  }, [booking, navigate]);

  if (!booking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p>Loading booking details...</p>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getBookingSummary = () => {
    if (booking.serviceType === 'nurse') {
      return {
        title: "Nursing Services",
        type: `${booking.nurseType} Nurse - ${booking.careType} Care`,
        details: [
          { label: "Date", value: formatDate(booking.date) },
          { label: "Time", value: booking.time },
          { label: "Hours", value: `${booking.hours} hour(s)` },
          { label: "Address", value: booking.pickupAddress },
        ]
      };
    } else {
      return {
        title: "Transportation",
        type: `${booking.serviceType} Transport - ${booking.transportType}`,
        details: [
          { label: "Date", value: formatDate(booking.date) },
          { label: "Time", value: booking.time },
          { label: "From", value: booking.pickupAddress },
          { label: "To", value: booking.dropoffAddress },
        ]
      };
    }
  };

  const bookingSummary = getBookingSummary();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Your {bookingSummary.title.toLowerCase()} booking has been successfully processed and confirmed.
            </p>
            
            <div className="mb-8 max-w-md mx-auto">
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Booking Details</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium capitalize">{bookingSummary.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{bookingSummary.type}</span>
                  </div>

                  {bookingSummary.details.map((detail, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{detail.label}:</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                  
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Paid:</span>
                      <span className="font-bold text-careblue-600">${booking.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="border-gray-300">
                <Link to="/dashboard">View All Bookings</Link>
              </Button>
              <Button asChild className="bg-careblue-600 hover:bg-careblue-700">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Have questions about your booking? <Link to="/ai-assistant" className="text-careblue-600 hover:underline">Ask our AI assistant</Link> or contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSuccess;
