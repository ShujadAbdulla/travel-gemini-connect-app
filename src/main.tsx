
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { initGeminiAPI } from './utils/ai.ts'

// Initialize Gemini API with the provided key
initGeminiAPI('AIzaSyD8kldOijOeC4IBoPdsvQYq-bAWqNvxZ0I');

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
