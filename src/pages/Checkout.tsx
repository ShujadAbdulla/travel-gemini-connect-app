import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Checkout = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById, completePayment } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Get booking details
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  
  // If no booking is found or user is not logged in, redirect
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to complete your booking");
      navigate("/login");
      return;
    }
    
    if (!booking) {
      toast.error("Booking not found");
      navigate("/");
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!booking || !bookingId) {
      toast.error("Booking information is missing");
      return;
    }
    
    // Basic validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return;
    }
    
    if (cvv.length !== 3 && cvv.length !== 4) {
      toast.error("Please enter a valid CVV");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real application, we would process the payment with Stripe or another provider
      // For this simulation, we'll just mark the booking as paid after a delay
      setTimeout(async () => {
        const success = await completePayment(bookingId);
        if (success) {
          // Navigate to success page
          navigate(`/booking-success/${bookingId}`);
        } else {
          toast.error("Payment processing failed");
        }
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  // Get booking type description
  const getBookingTypeDescription = () => {
    if (!booking) return '';
    
    if (booking.serviceType === 'nurse') {
      return `${booking.nurseType} Nurse - ${booking.careType} Care`;
    } else if (booking.transportType !== 'none') {
      return `${booking.serviceType} Transport - ${booking.transportType}`;
    } else {
      return `${booking.serviceType} Service`;
    }
  };

  // Format card number with spaces for readability
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600 mt-2">Review and pay for your services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Booking summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Booking Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium capitalize">{getBookingTypeDescription()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{booking.time}</span>
                  </div>

                  {booking.hours && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{booking.hours} hour(s)</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 my-3 pt-3">
                    {booking.serviceType === 'nurse' ? (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium text-right">{booking.pickupAddress}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pickup:</span>
                          <span className="font-medium text-right">{booking.pickupAddress}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-600">Dropoff:</span>
                          <span className="font-medium text-right">{booking.dropoffAddress}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 my-3 pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-careblue-600">${booking.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Payment Information</h2>
                
                <form onSubmit={handlePayment}>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="care-input"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="care-input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            let formatted = value;
                            if (value.length > 2) {
                              formatted = value.slice(0, 2) + '/' + value.slice(2);
                            }
                            setExpiryDate(formatted);
                          }
                        }}
                        className="care-input"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="password"
                        value={cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            setCvv(value);
                          }
                        }}
                        className="care-input"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                      onClick={() => booking.serviceType === 'nurse' ? navigate('/nurses') : navigate('/transport')}
                      disabled={isProcessing}
                    >
                      Back to Booking
                    </Button>
                    <Button
                      type="submit"
                      className="bg-careblue-600 hover:bg-careblue-700 text-white flex-1"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing Payment...' : `Pay $${booking.price}`}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    This is a demo simulation. No real payment will be processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
