
import React from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            CareConnect offers a comprehensive range of transportation services designed to meet the unique needs of our clients.
          </p>
        </div>

        {/* Medical Transport Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Medical Transportation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our medical transportation services are designed for patients who need to travel to healthcare appointments, treatments, or medical facilities.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Transportation to medical appointments and treatments</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Hospital discharge transportation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Inter-facility transfers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Trained drivers with medical knowledge</span>
                </li>
              </ul>
              <Button
                onClick={() => navigate('/transport')}
                className="bg-careblue-600 hover:bg-careblue-700 text-white"
              >
                Book Medical Transport
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                alt="Medical Transportation" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Non-Medical Transport */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                alt="Non-Medical Transportation" 
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Non-Medical Transportation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our non-medical transportation services help clients maintain their independence by providing reliable transportation for daily activities.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careteal-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Grocery shopping and errands</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careteal-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Pharmacy visits</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careteal-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Social and recreational activities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careteal-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Visits to friends and family</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-careteal-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Reliable, punctual service</span>
                </li>
              </ul>
              <Button
                onClick={() => navigate('/transport')}
                className="bg-careteal-600 hover:bg-careteal-700 text-white"
              >
                Book Non-Medical Transport
              </Button>
            </div>
          </div>
        </section>

        {/* Vehicle Types */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Options</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a variety of vehicle types to accommodate different mobility needs and ensure comfortable transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Transport</h3>
                <p className="text-gray-600 mb-4">
                  Comfortable sedans and SUVs for clients who can walk and transfer with minimal assistance.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Door-to-door service</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Assistance getting in/out of vehicle</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Clean, well-maintained vehicles</span>
                  </li>
                </ul>
                <div className="text-lg font-bold text-careblue-600 mb-4">
                  Starting at $50
                </div>
                <Button
                  onClick={() => navigate('/transport')}
                  className="w-full bg-careblue-600 hover:bg-careblue-700 text-white"
                  variant="outline"
                >
                  Book Standard Transport
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-careblue-500">
              <div className="bg-careblue-500 text-white py-2 text-center text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Wheelchair Transport</h3>
                <p className="text-gray-600 mb-4">
                  Specially equipped vehicles for clients who use wheelchairs or have mobility limitations.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Wheelchair accessible vans</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Hydraulic lifts and ramps</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Secure wheelchair lockdown system</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Trained staff for safe transfers</span>
                  </li>
                </ul>
                <div className="text-lg font-bold text-careblue-600 mb-4">
                  Starting at $75
                </div>
                <Button
                  onClick={() => navigate('/transport')}
                  className="w-full bg-careblue-600 hover:bg-careblue-700 text-white"
                >
                  Book Wheelchair Transport
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Stretcher Transport</h3>
                <p className="text-gray-600 mb-4">
                  Specialized vehicles for clients who need to remain lying down during transport.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Comfortable stretcher accommodation</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Secure stretcher locking system</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Medically trained staff</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-4 h-4 text-careblue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Safe, gentle transportation</span>
                  </li>
                </ul>
                <div className="text-lg font-bold text-careblue-600 mb-4">
                  Starting at $120
                </div>
                <Button
                  onClick={() => navigate('/transport')}
                  className="w-full bg-careblue-600 hover:bg-careblue-700 text-white"
                  variant="outline"
                >
                  Book Stretcher Transport
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-careblue-600 to-careteal-600 rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  AI Care Assistant
                </h2>
                <p className="text-lg mb-6">
                  Our AI assistant is available 24/7 to help you navigate your transportation needs, answer questions about our services, and provide care advice.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>24/7 availability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Transportation recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>General health and wellness advice</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Service information and FAQ</span>
                  </li>
                </ul>
                <Button
                  onClick={() => navigate('/ai-assistant')}
                  className="bg-white text-careblue-600 hover:bg-gray-100"
                >
                  Try AI Assistant
                </Button>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="AI Assistant" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Book Your Transportation?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button
                onClick={() => navigate('/transport')}
                className="bg-careblue-600 hover:bg-careblue-700 text-white px-8 py-2"
                size="lg"
              >
                Book Transport
              </Button>
              <Button
                onClick={() => window.location.href = 'mailto:support@careconnect.com'}
                variant="outline"
                className="border-careblue-500 text-careblue-600 hover:bg-careblue-50 px-8 py-2"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
