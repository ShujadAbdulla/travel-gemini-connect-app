
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-9xl font-bold text-careblue-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-careblue-600 hover:bg-careblue-700 text-white"
            >
              <Link to="/">
                Return to Home
              </Link>
            </Button>
            <p className="text-sm text-gray-500">
              Need help? <Link to="/contact" className="text-careblue-600 hover:underline">Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
