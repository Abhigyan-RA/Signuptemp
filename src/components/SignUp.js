import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react';
import { FaArrowRight, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import google from '../assets/Social icon.png';
import img from '../assets/left.png';

function SignUp() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp, setActive } = useSignUp();

  const handleOAuthSignUp = async (strategy) => {
    console.log('Starting Google sign-up...');
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
      console.log('Redirecting to Google for sign-up...');
    } catch (err) {
      console.error('Error during Google sign-up:', err);  // This will give detailed error logs
      setError('Google sign-up failed. Please try again.');
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress,
        password,
       
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard');
      } else {
        setError('Sign-up failed. Please check all fields and try again.');
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
      setError('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden mt-2">
      <div className="min-h-screen flex items-center justify-center w-1/2 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-2xl font-medium text-center font-jakarta mb-2 text-[#004838]">
              Create Your Lagoon Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Make hiring simpler with Lagoon!
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => handleOAuthSignUp('oauth_google')}
              className="w-full flex items-center justify-center bg-[#F8F8F8] rounded-md border-[#C8C8C8] border-[1px] py-1.5"
            >
              <img src={google} alt="Google" />
              <span className="text-[#19191B] text-md font-medium ml-5">Continue with Google</span>
            </button>

            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#004838] text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[#004838] text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[#004838] text-sm font-medium mb-1">Create a password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>

              {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-[#004838] text-[#E2FB6C]"
              >
                Create Account
                <FaArrowRight className="ml-2 mt-1" />
              </button>
            </form>

            <div className="mt-6 text-center leading-3">
              <p className="text-sm text-[#999BA1]">
                Already have an account?{' '}
                <a href="/sign-in" className="font-medium text-[#004838] underline">Login</a>
              </p>
              <p className="text-sm text-[#999BA1]">
                By signing up you agree to our <a className="text-[#004838] underline">Terms</a> &{' '}
                <a className="text-[#004838] underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-screen border-[5px] rounded-lg mt-40 border-t-[#004838] border-l-[#004838]">
        <img
          src={img}
          alt="Background"
          className="w-full h-full"
          style={{ objectPosition: 'top left' }}
        />
      </div>
    </div>
  );
}

export default SignUp;
