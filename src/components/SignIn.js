import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import google from '../assets/Social icon.png';
import { FaArrowRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function SignIn() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn();

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
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard');
      } else {
        console.error('Sign-in failed', result);
        setError('Sign-in failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError('An error occurred during sign-in');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">

        <h2 className="text-2xl font-medium text-center font-jakarta mb-2 text-[#004838]">
          Sign In To Your Lagoon Account
        </h2>
        <p className="text-center font-jakarta text-gray-500 mb-6">
          Make hiring simpler with Lagoon!
        </p>

        <button className="w-full flex items-center justify-center rounded-md bg-[#F8F8F8] border-[#C8C8C8] border-[1px] py-1.5 mb-6">
          <img src={google} alt="Google" className="" />
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
              placeholder='Enter your email'
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
              type={showPassword ? 'text' : 'password'} // Toggle between text and password types
              id="password"
              placeholder='Enter your password'
              className="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 mt-5 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end mb-4">
            <p className="text-sm text-[#004838] cursor-pointer">Forgot Password?</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#004838] text-[#E2FB6C] py-2 rounded-md flex items-center justify-center gap-2"
          >
            Sign In
            <span>
              <FaArrowRight />
            </span>
          </button>

        </form>

        <p className="mt-4 text-center text-sm text-[#999BA1]">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-[#145b25] underline">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
