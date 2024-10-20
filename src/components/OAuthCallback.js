import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';

function OAuthCallback() {
  const { handleRedirectCallback } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function processOAuthCallback() {
      try {
        await handleRedirectCallback();
        
        if (isLoaded) {
          if (isSignedIn) {
            console.log("User signed in:", user);
            navigate('/dashboard');
          } else {
            console.log("User not signed in after OAuth");
            navigate('/sign-up');
          }
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/sign-up');
      }
    }

    processOAuthCallback();
  }, [handleRedirectCallback, navigate, isLoaded, isSignedIn, user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Processing authentication, please wait...</p>
    </div>
  );
}

export default OAuthCallback;
