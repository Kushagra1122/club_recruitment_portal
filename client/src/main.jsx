import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/Theme.jsx';
import {  Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/Auth.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
