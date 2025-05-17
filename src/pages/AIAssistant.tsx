
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { toast } from 'sonner';
import { generateCareAdvice, hasGeminiKey, initGeminiAPI } from '@/utils/ai';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your CareConnect AI assistant. I can help you with transportation needs, care advice, and answer questions about our services. How can I assist you today?'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if API key is set
  useEffect(() => {
    if (!hasGeminiKey()) {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!hasGeminiKey()) {
      setIsApiKeyModalOpen(true);
      return;
    }

    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Show loading indicator
    setIsProcessing(true);
    
    try {
      // Generate response
      const aiResponse = await generateCareAdvice(userMessage);
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('AI Response error:', error);
      toast.error('Failed to get a response. Please check your API key or try again later.');
      
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'I\'m having trouble connecting to my knowledge base. Please check your API key or try again later.' 
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error('Please enter your Gemini API key');
      return;
    }
    
    try {
      // Initialize the API with the provided key
      initGeminiAPI(apiKey.trim());
      setIsApiKeyModalOpen(false);
      toast.success('API key set successfully!');
    } catch (error) {
      console.error('API key error:', error);
      toast.error('Failed to set API key');
    }
  };

  // Handle some predefined queries
  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Adding a small delay to make it feel more natural
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Care Assistant</h1>
            <p className="text-gray-600">
              Get help with transport bookings, care advice, and more
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Chat messages */}
            <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-careblue-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="text-left mb-4">
                  <div className="inline-block max-w-[80%] rounded-lg px-4 py-3 bg-white border border-gray-200">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="text-sm text-gray-500 mb-2">Common Questions:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickQuestion('How do I book transportation?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full"
                >
                  How do I book transportation?
                </button>
                <button
                  onClick={() => handleQuickQuestion('What types of transport do you provide?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full"
                >
                  What types of transport do you provide?
                </button>
                <button
                  onClick={() => handleQuickQuestion('Is wheelchair transport available?')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full"
                >
                  Is wheelchair transport available?
                </button>
              </div>
            </div>

            {/* Input form */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Type your message here..."
                  disabled={isProcessing}
                />
                <Button
                  type="submit"
                  className="bg-careblue-600 hover:bg-careblue-700"
                  disabled={isProcessing || !input.trim() || !hasGeminiKey()}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-8 bg-careblue-50 border border-careblue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Need to book transportation?</h3>
            <p className="text-gray-600 mb-4">
              Our AI assistant can help with advice, but you can also book directly through our platform.
            </p>
            <Button 
              onClick={() => navigate('/transport')}
              className="bg-careblue-600 hover:bg-careblue-700"
            >
              Book Transportation
            </Button>
          </div>

          {/* API Key Modal */}
          {isApiKeyModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Set Gemini API Key</h2>
                <p className="text-gray-600 mb-4">
                  To use the AI assistant, you need to provide your Google Gemini API key.
                  You can get one for free from the{' '}
                  <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-careblue-600 hover:underline"
                  >
                    Google AI Studio
                  </a>.
                </p>
                
                <form onSubmit={handleApiKeySubmit} className="space-y-4">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                      Gemini API Key
                    </label>
                    <input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="care-input"
                      placeholder="Enter your Gemini API key"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-300"
                      onClick={() => navigate('/')}
                    >
                      Skip for Now
                    </Button>
                    <Button
                      type="submit"
                      className="bg-careblue-600 hover:bg-careblue-700"
                    >
                      Set API Key
                    </Button>
                  </div>
                </form>
                
                <p className="mt-4 text-xs text-gray-500">
                  Your API key will be stored securely in your browser&apos;s local storage.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
