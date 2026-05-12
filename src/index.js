import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// Get the root element from index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root div
root.render(
    <Auth0Provider
    domain="dev-rnraytt3uldszntd.us.auth0.com"
    clientId="pZRgMxfe9vTcODssVFrHoSHRAzxeM2p9"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
        <App />
  </Auth0Provider>

);
