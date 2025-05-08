import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import Store from './app/store.js';

import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT;
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId={client_id}>
        <Provider store={Store}>
          <Toaster position="top-center" reverseOrder={true} />
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>,
);
