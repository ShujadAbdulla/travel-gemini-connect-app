
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { bookings } = useBooking();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentBadgeClass = (status: string) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {user && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}</h1>
              <p className="text-gray-600">Manage your transportation bookings and account details</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/transport')}
                    className="w-full bg-careblue-600 hover:bg-careblue-700 text-white"
                  >
                    Book New Transport
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/ai-assistant')}
                    variant="outline"
                    className="w-full border-careblue-500 text-careblue-600 hover:bg-careblue-50"
                  >
                    AI Care Assistant
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Account Overview</h2>
                <div className="space-y-3">
                  <div>
                    <span className="block text-sm text-gray-600">Email</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-600">Total Bookings</span>
                    <span className="font-medium">{bookings.length}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-600">Member Since</span>
                    <span className="font-medium">May 2023</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link 
                    to="/settings" 
                    className="text-sm text-careblue-600 hover:text-careblue-500 font-medium"
                  >
                    Account Settings →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Your Bookings</h2>
                
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't made any transportation bookings yet.
                    </p>
                    <Button 
                      onClick={() => navigate('/transport')} 
                      className="bg-careblue-600 hover:bg-careblue-700 text-white"
                    >
                      Book Your First Ride
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-2 font-semibold text-gray-600">Date</th>
                          <th className="pb-2 font-semibold text-gray-600">Service</th>
                          <th className="pb-2 font-semibold text-gray-600">Status</th>
                          <th className="pb-2 font-semibold text-gray-600">Payment</th>
                          <th className="pb-2 font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="py-3 pr-2">
                              <div className="font-medium">{formatDate(booking.date)}</div>
                              <div className="text-xs text-gray-500">{booking.time}</div>
                            </td>
                            <td className="py-3 pr-2 capitalize">
                              <div className="font-medium">{booking.serviceType}</div>
                              <div className="text-xs text-gray-500">{booking.transportType}</div>
                            </td>
                            <td className="py-3 pr-2">
                              <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusBadgeClass(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 pr-2">
                              <span className={`px-2 py-1 rounded-full text-xs capitalize ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                                {booking.paymentStatus}
                              </span>
                            </td>
                            <td className="py-3">
                              <Link 
                                to={`/booking-details/${booking.id}`}
                                className="text-sm text-careblue-600 hover:text-careblue-500 font-medium"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
