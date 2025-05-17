
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface Booking {
  id: string;
  userId: string;
  serviceType: "medical" | "non-medical";
  transportType: "standard" | "wheelchair" | "stretcher";
  date: string;
  time: string;
  pickupAddress: string;
  dropoffAddress: string;
  specialRequirements?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid";
  price: number;
}

interface BookingContextType {
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, "id" | "userId" | "status" | "paymentStatus">) => Promise<Booking>;
  completePayment: (bookingId: string) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load bookings from localStorage when user is available
    if (user) {
      const storedBookings = localStorage.getItem('care_bookings');
      if (storedBookings) {
        try {
          const allBookings = JSON.parse(storedBookings);
          // Filter only the current user's bookings
          const userBookings = allBookings.filter((booking: Booking) => booking.userId === user.id);
          setBookings(userBookings);
        } catch (e) {
          console.error('Failed to parse stored bookings', e);
        }
      }
    } else {
      // Clear bookings when no user is logged in
      setBookings([]);
    }
  }, [user]);

  const saveBookings = (updatedBookings: Booking[]) => {
    // Get all bookings first
    const storedBookings = localStorage.getItem('care_bookings');
    let allBookings: Booking[] = [];
    
    if (storedBookings) {
      allBookings = JSON.parse(storedBookings);
      // Remove current user's bookings
      allBookings = allBookings.filter(booking => booking.userId !== user?.id);
    }
    
    // Add updated user bookings
    allBookings = [...allBookings, ...updatedBookings];
    
    localStorage.setItem('care_bookings', JSON.stringify(allBookings));
    setBookings(updatedBookings);
  };

  const createBooking = async (bookingData: Omit<Booking, "id" | "userId" | "status" | "paymentStatus">): Promise<Booking> => {
    if (!user) {
      throw new Error("User must be logged in to create a booking");
    }

    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      userId: user.id,
      status: "pending",
      paymentStatus: "pending"
    };

    const updatedBookings = [...bookings, newBooking];
    saveBookings(updatedBookings);
    
    toast.success("Booking created successfully!");
    return newBooking;
  };

  const completePayment = async (bookingId: string): Promise<boolean> => {
    try {
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex === -1) {
        toast.error("Booking not found");
        return false;
      }
      
      const updatedBookings = [...bookings];
      updatedBookings[bookingIndex] = {
        ...updatedBookings[bookingIndex],
        paymentStatus: "paid",
        status: "confirmed"
      };
      
      saveBookings(updatedBookings);
      toast.success("Payment completed successfully!");
      return true;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed. Please try again.");
      return false;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex === -1) {
        toast.error("Booking not found");
        return false;
      }
      
      const updatedBookings = [...bookings];
      updatedBookings[bookingIndex] = {
        ...updatedBookings[bookingIndex],
        status: "cancelled"
      };
      
      saveBookings(updatedBookings);
      toast.success("Booking cancelled successfully!");
      return true;
    } catch (error) {
      console.error('Cancellation error:', error);
      toast.error("Cancellation failed. Please try again.");
      return false;
    }
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      createBooking, 
      completePayment, 
      cancelBooking,
      getBookingById
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
