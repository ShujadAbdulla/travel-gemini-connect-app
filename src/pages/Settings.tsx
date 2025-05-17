
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { initGeminiAPI, hasGeminiKey } from '@/utils/ai';
import { toast } from 'sonner';

const Settings = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [apiKeyInputVisible, setApiKeyInputVisible] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !user) {
      toast.error("Please log in to access settings");
      navigate('/login');
    }
    
    // Check if Gemini API key is set
    setHasKey(hasGeminiKey());
  }, [user, isLoading, navigate]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    try {
      initGeminiAPI(apiKey.trim());
      setHasKey(true);
      setApiKey('');
      setApiKeyInputVisible(false);
      toast.success('API key saved successfully!');
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setHasKey(false);
    toast.success('API key removed');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading settings...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account and application settings</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Account Information</h2>
            
            {user && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="care-input bg-gray-100">{user.name}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="care-input bg-gray-100">{user.email}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account ID
                  </label>
                  <div className="care-input bg-gray-100">{user.id}</div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">AI Assistant Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gemini API Key
                </label>
                
                {hasKey ? (
                  <div className="flex items-center space-x-4">
                    <div className="care-input bg-gray-100 flex-grow">●●●●●●●●●●●●●●●●●●●●</div>
                    <Button 
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={removeApiKey}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    {apiKeyInputVisible ? (
                      <div className="space-y-2">
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="care-input"
                          placeholder="Enter your Gemini API key"
                        />
                        <p className="text-xs text-gray-500">
                          Get your API key from the{' '}
                          <a 
                            href="https://makersuite.google.com/app/apikey" 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-careblue-600 hover:underline"
                          >
                            Google AI Studio
                          </a>
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            onClick={handleSaveApiKey}
                            className="bg-careblue-600 hover:bg-careblue-700"
                          >
                            Save API Key
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-300"
                            onClick={() => setApiKeyInputVisible(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setApiKeyInputVisible(true)}
                        variant="outline"
                        className="border-careblue-500 text-careblue-600 hover:bg-careblue-50"
                      >
                        Add API Key
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-2">
                  The AI assistant requires a Google Gemini API key to function.
                </p>
                <p className="text-sm text-gray-500">
                  Your API key is stored securely in your browser's local storage.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive booking confirmations and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" onChange={() => {}} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-careblue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Receive text messages about your bookings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={() => {}} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-careblue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Reminder Notifications</h3>
                  <p className="text-sm text-gray-500">Receive reminders before your scheduled transport</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" onChange={() => {}} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-careblue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button
                className="bg-careblue-600 hover:bg-careblue-700 text-white"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
