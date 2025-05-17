
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
// This key will be provided by the user or via environment variables
let geminiApiKey = 'AIzaSyD8kldOijOeC4IBoPdsvQYq-bAWqNvxZ0I'; // Default key provided by user

export const initGeminiAPI = (apiKey: string) => {
  geminiApiKey = apiKey;
  localStorage.setItem('gemini_api_key', apiKey);
  return new GoogleGenerativeAI(apiKey);
};

export const getGeminiAPI = () => {
  if (!geminiApiKey) {
    // Try to get from localStorage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      geminiApiKey = savedKey;
    }
  }
  
  if (!geminiApiKey) {
    throw new Error('Gemini API key not set. Please set it in the settings page.');
  }
  
  return new GoogleGenerativeAI(geminiApiKey);
};

export const hasGeminiKey = () => {
  return !!geminiApiKey || !!localStorage.getItem('gemini_api_key');
};

export const generateCareAdvice = async (query: string): Promise<string> => {
  try {
    const genAI = getGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Add a specific system prompt for healthcare context
    const prompt = `
      As a healthcare assistant, please provide helpful, accurate, and compassionate advice about: 
      
      ${query}
      
      Focus on general wellness information, transportation options, nursing care, and care coordination. 
      Do not provide specific medical diagnoses or treatment recommendations.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error: any) {
    console.error("Error generating care advice:", error);
    return `Error: ${error.message || 'Could not generate advice'}`;
  }
};
