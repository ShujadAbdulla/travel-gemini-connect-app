
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const NurseBooking = () => {
  const { user } = useAuth();
  const { createBooking } = useBooking();
  const navigate = useNavigate();

  // Form state
  const [nurseType, setNurseType] = useState<"registered" | "practical" | "specialized">("registered");
  const [careType, setCareType] = useState<"home" | "facility" | "telehealth">("home");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPriceEstimate = () => {
    // Calculate price based on nurse type, care type, and hours
    let hourlyRate = 0;
    
    switch(nurseType) {
      case "registered":
        hourlyRate = 75;
        break;
      case "practical":
        hourlyRate = 60;
        break;
      case "specialized":
        hourlyRate = 90;
        break;
      default:
        hourlyRate = 75;
    }
    
    // Add premium for certain care types
    if (careType === "home") {
      hourlyRate += 15;
    }
    
    return hourlyRate * hours;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book nursing services");
      navigate("/login");
      return;
    }

    if (!date || !time || !address) {
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
        serviceType: "nurse",
        transportType: "none", // Not applicable for nursing
        nurseType,
        careType,
        hours,
        date,
        time,
        pickupAddress: address,
        dropoffAddress: "N/A", // Not applicable for nursing
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
            <h1 className="text-3xl font-bold text-gray-900">Book Nursing Services</h1>
            <p className="text-gray-600 mt-2">Schedule professional nursing care when and where you need it</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Nurse Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      nurseType === "registered" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setNurseType("registered")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        nurseType === "registered" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {nurseType === "registered" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Registered Nurse (RN)</h3>
                        <p className="text-sm text-gray-500">Full nursing care capabilities</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      nurseType === "practical" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setNurseType("practical")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        nurseType === "practical" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {nurseType === "practical" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Licensed Practical Nurse (LPN)</h3>
                        <p className="text-sm text-gray-500">Basic nursing support</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      nurseType === "specialized" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setNurseType("specialized")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        nurseType === "specialized" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {nurseType === "specialized" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Specialized Nurse</h3>
                        <p className="text-sm text-gray-500">Specialized medical care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Care Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      careType === "home" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setCareType("home")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        careType === "home" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {careType === "home" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Home Care</h3>
                        <p className="text-sm text-gray-500">Nursing services at your residence</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      careType === "facility" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setCareType("facility")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        careType === "facility" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {careType === "facility" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Facility Care</h3>
                        <p className="text-sm text-gray-500">Care at a medical facility</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      careType === "telehealth" 
                        ? "border-careblue-500 bg-careblue-50" 
                        : "border-gray-200 hover:border-careblue-300"
                    }`}
                    onClick={() => setCareType("telehealth")}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        careType === "telehealth" ? "bg-careblue-500" : "border border-gray-300"
                      }`}>
                        {careType === "telehealth" && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Telehealth</h3>
                        <p className="text-sm text-gray-500">Remote nursing consultation</p>
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
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                  Hours Needed *
                </label>
                <div className="flex items-center">
                  <button 
                    type="button" 
                    className="border rounded-l-md px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    onClick={() => setHours(prev => (prev > 1 ? prev - 1 : 1))}
                  >
                    -
                  </button>
                  <input
                    id="hours"
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                    className="care-input rounded-none w-16 text-center"
                    min="1"
                    required
                  />
                  <button 
                    type="button" 
                    className="border rounded-r-md px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    onClick={() => setHours(prev => prev + 1)}
                  >
                    +
                  </button>
                  <span className="ml-2 text-gray-600">hour(s)</span>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="care-input"
                  placeholder="Enter full address"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {careType === "telehealth" ? "For telehealth, enter your current location" : "Enter the address where nursing care is needed"}
                </p>
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
                  placeholder="Please let us know about any specific medical conditions, equipment needed, or other special requirements"
                />
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Price Estimate</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-careblue-600">${getPriceEstimate()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Final price may vary based on actual hours and additional services
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

export default NurseBooking;
