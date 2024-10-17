
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import OAuthCallback from './components/OAuthCallback';

function App() {
  return (
    <GoogleOAuthProvider clientId="771462228760-cg8hgtffemf0l7rdgvp997vs1im4pr6v.apps.googleusercontent.com">
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<SignInPage />} />
      <Route path="/sso-callback" element={<OAuthCallback />} />
    </Routes>
  </GoogleOAuthProvider>
  );
}

export default App;
