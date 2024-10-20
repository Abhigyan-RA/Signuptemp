import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import google from '../assets/Social icon.png';
import { FaArrowRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import image from '../assets/Desktop - 3.png';

function SignIn() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp(); 

  const handleOAuthSignIn = async (strategy) => {
    console.log('Starting Google sign-in...');
  
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback', 
        redirectUrlComplete: '/dashboard', 
      });
      console.log('Redirecting to Google for authentication...');
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      if (err.response) {
        console.log('Error status:', err.response.status);
        console.log('Error message:', err.response.data);
      }
      setError('Google sign-in failed. Please try again.');
    }
  };

  async function handleSignIn(strategy) {
    if (!signIn || !signUp) return null;

   
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === 'transferable' &&
      signUp.verifications.externalAccount.error?.code === 'external_account_exists';

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });
      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
        navigate('/dashboard');
      }
    }

    // If the user has an OAuth account but does not have an account in your app
    const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable';

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });
      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
        navigate('/dashboard');
      }
    } else {
      handleOAuthSignIn(strategy);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        navigate('/dashboard');
      } else {
        setError('Sign-in failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError('An error occurred during sign-in.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden mt-8">
      <div className="w-1/2 h-screen">
        <img
          src={image}
          alt="Background"
          className="w-full h-full mt-32"
          style={{ objectPosition: "top left" }}
        />
      </div>

      <div className="flex w-1/2 items-center justify-center mb-40 bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-medium text-center font-jakarta mb-2 text-[#004838]">
            Sign In To Your Lagoon Account
          </h2>
          <p className="text-center font-jakarta text-gray-500 mb-6">
            Make hiring simpler with Lagoon!
          </p>

          <button
            onClick={() => handleSignIn('oauth_google')}
            className="w-full flex items-center justify-center rounded-md bg-[#F8F8F8] border-[#C8C8C8] border-[1px] py-1.5 mb-6"
          >
            <img src={google} alt="Google" />
            <span className="text-[#19191B] text-md font-medium ml-5">
              Continue with Google
            </span>
          </button>

          <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#004838] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>

            <div className="mt-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-[#004838] mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 mt-5 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-[#004838] text-white py-2 rounded-md"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#999BA1]">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-[#145b25] underline">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
