
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const Transport = () => {
  const { user } = useAuth();
  const { createBooking } = useBooking();
  const navigate = useNavigate();

  // Form state
  const [serviceType, setServiceType] = useState<"medical" | "non-medical">("medical");
  const [transportType, setTransportType] = useState<"standard" | "wheelchair" | "stretcher">("standard");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPriceEstimate = () => {
    // Calculate price based on transport type and service type
    let basePrice = 0;
    
    switch(transportType) {
      case "standard":
        basePrice = 50;
        break;
      case "wheelchair":
        basePrice = 75;
        break;
      case "stretcher":
        basePrice = 120;
        break;
      default:
        basePrice = 50;
    }
    
    // Add premium for medical transport
    if (serviceType === "medical") {
      basePrice += 25;
    }
    
    return basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book transportation");
      navigate("/login");
      return;
    }

    if (!date || !time || !pickupAddress || !dropoffAddress) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate date is in the future
    const selectedDate = new Date(`${date}T${time}`);
    if (selectedDate <= new Date()) {
      toast.error("Please select a future date and time");
      return;
    }

    setIsSubmitting(true);

    try {
      const price = getPriceEstimate();
      
      const newBooking = await createBooking({
        serviceType,
        transportType,
        date,
        time,
        pickupAddress,
        dropoffAddress,
        specialRequirements,
        price
      });
      
      // Navigate to checkout with the created booking ID
      navigate(`/checkout/${newBooking.id}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book Transportation</h1>
            <p className="text-gray-600 mt-2">Schedule reliable transport for your healthcare needs</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Service Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      serviceType === "medical" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setServiceType("medical")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        serviceType === "medical" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {serviceType === "medical" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Medical Transportation</h3>
                        <p className="text-sm text-gray-500">For hospital visits, medical appointments</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      serviceType === "non-medical" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setServiceType("non-medical")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        serviceType === "non-medical" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {serviceType === "non-medical" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Non-Medical Transportation</h3>
                        <p className="text-sm text-gray-500">For pharmacy, grocery, or social visits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Transport Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      transportType === "standard" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setTransportType("standard")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        transportType === "standard" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {transportType === "standard" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Standard</h3>
                        <p className="text-sm text-gray-500">Regular car service</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      transportType === "wheelchair" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setTransportType("wheelchair")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        transportType === "wheelchair" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {transportType === "wheelchair" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Wheelchair</h3>
                        <p className="text-sm text-gray-500">Accessible vehicle</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      transportType === "stretcher" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setTransportType("stretcher")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        transportType === "stretcher" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {transportType === "stretcher" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Stretcher</h3>
                        <p className="text-sm text-gray-500">Medical transport vehicle</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="care-input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="care-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Pickup & Dropoff</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Address *
                    </label>
                    <input
                      id="pickup"
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="care-input"
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
                      Dropoff Address *
                    </label>
                    <input
                      id="dropoff"
                      type="text"
                      value={dropoffAddress}
                      onChange={(e) => setDropoffAddress(e.target.value)}
                      className="care-input"
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requirements (Optional)
                </label>
                <textarea
                  id="requirements"
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="care-input min-h-[100px] resize-y"
                  placeholder="Please let us know about any special requirements or accommodations needed"
                />
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Price Estimate</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-careblue-600">${getPriceEstimate()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Final price may vary based on actual distance and additional services
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-careblue-600 hover:bg-careblue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue to Payment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transport;
