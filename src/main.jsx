import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthProvider } from "@descope/react-sdk"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider projectId='P2oU0Ggad9VkfCwcikiCO6YUQdmY'>
        <Router>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Router>
    </AuthProvider>
  </React.StrictMode>
);
