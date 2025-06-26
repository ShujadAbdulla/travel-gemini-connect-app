import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Healthcare Transportation Solution
              </h1>
              <p className="text-lg mb-8">
                Connecting patients with reliable medical and non-medical transportation services, enhancing accessibility to healthcare for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-white text-careblue-600 hover:bg-gray-100 font-medium px-6 py-2"
                  onClick={() => navigate('/transport')}
                >
                  Book Transport
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-medium px-6 py-2"
                  onClick={() => navigate('/services')}
                >
                  Explore Services
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Healthcare transportation" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of transportation and care services to meet your healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Medical Transport"
              description="Safe and reliable transportation for medical appointments, hospital visits, and specialized care."
              buttonText="Book Now"
              navigateTo="/transport"
              className="animate-slide-up"
            />
            <ServiceCard
              title="Non-Medical Transport"
              description="Everyday transportation solutions for pharmacy visits, grocery shopping, and social activities."
              buttonText="Book Now" 
              navigateTo="/transport"
              className="animate-slide-up"
            />
            <ServiceCard
              title="AI Care Assistant"
              description="Get personalized care advice and transportation recommendations from our AI assistant."
              buttonText="Try Now"
              navigateTo="/ai-assistant"
              className="animate-slide-up"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting the transportation you need is simple and straightforward with CareConnect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-careblue-100 rounded-full flex items-center justify-center text-careblue-600 text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Book Your Ride</h3>
              <p className="text-gray-600">
                Choose your service type, date, and location details through our easy booking system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-careblue-100 rounded-full flex items-center justify-center text-careblue-600 text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Confirm & Pay</h3>
              <p className="text-gray-600">
                Review your booking details and complete your payment securely online.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-careblue-100 rounded-full flex items-center justify-center text-careblue-600 text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Your driver will arrive at the scheduled time to take you safely to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read how CareConnect has helped people get to their healthcare appointments with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-careblue-200 flex items-center justify-center text-careblue-700 font-bold">JD</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Doe</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "CareConnect has been a lifesaver for my weekly dialysis appointments. The drivers are always on time and very professional."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-careblue-200 flex items-center justify-center text-careblue-700 font-bold">RS</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Smith</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The wheelchair-accessible transport has made my hospital visits so much easier. I don't know what I'd do without this service."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-careblue-200 flex items-center justify-center text-careblue-700 font-bold">MJ</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Maria Johnson</h4>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI assistant helped me figure out exactly what type of transportation I needed for my medical situation. Very helpful!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-careblue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Transport?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who rely on CareConnect for their healthcare transportation needs.
          </p>
          <Button 
            className="bg-white text-careblue-600 hover:bg-gray-100 font-medium px-8 py-2"
            size="lg"
            onClick={() => navigate('/transport')}
          >
            Book Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
