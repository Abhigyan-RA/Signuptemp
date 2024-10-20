import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import OAuthCallback from './components/OAuthCallback';

const clerkFrontendApi = 'pk_test_aGFybWxlc3MtYmFkZ2VyLTEyLmNsZXJrLmFjY291bnRzLmRldiQ';

function App() {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/sso-callback" element={<OAuthCallback />} />
      </Routes>
    </ClerkProvider>
  );
}

export default App;
