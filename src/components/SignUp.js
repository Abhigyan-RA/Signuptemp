import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp, useAuth } from '@clerk/clerk-react';
import { FaGoogle, FaLinkedin, FaArrowRight, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { GoogleLogin } from '@react-oauth/google';
import google from '../assets/Social icon.png';
import img from '../assets/left.png'

function SignUp() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { signUp, setActive } = useSignUp();
  const { isSignedIn, signOut } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      handleSignOut();
    }
  }, [isSignedIn]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailAddress || !password || !username || !firstName || !lastName) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (isSignedIn) {
        await handleSignOut();
      }

      const result = await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard');
      } else {
        console.error('Sign-up failed', result);
        setError('Sign-up failed. Please check all fields and try again.');
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
      if (err.errors && err.errors.length > 0) {
        setError(err.errors.map(e => e.message).join(', '));
      } else {
        setError('An error occurred during sign-up. Please try again.');
      }
    }
  };

  const handleGoogleSignUp = async (googleData) => {
    try {
      const result = await signUp.create({
        strategy: "oauth_google",
        externalAccountId: googleData.profileObj.googleId,
        emailAddress: googleData.profileObj.email,
        firstName: googleData.profileObj.givenName,
        lastName: googleData.profileObj.familyName,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/dashboard');
      } else {
        console.error('Google sign-up failed', result);
        setError('Google sign-up failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during Google sign-up:', err);
      setError('An error occurred during Google sign-up. Please try again.');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In Error:', error);
    setError('Google sign-up failed. Please try again.');
  };

  return (
    <div className="flex h-screen overflow-hidden mt-2">
      <div className="min-h-screen flex items-center  justify-center w-1/2 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-2xl font-medium text-center font-jakarta mb-2 text-[#004838]">
              Create Your Lagoon Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Make hiring simpler with Lagoon!
            </p>
          </div>

          <form className="space-y-0" onSubmit={handleSubmit}>
            <div className="flex w-full justify-center">
              <button className="w-full flex items-center justify-center bg-[#F8F8F8] rounded-md border-[#C8C8C8] border-[1px] py-1.5 mb-6">
                <img src={google} alt="Google" />
                <span className="text-[#19191B] text-md font-medium ml-5">Continue with Google</span>
              </button>
            </div>

            <div className="flex items-center justify-center ">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-4">
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
                    type={showPassword ? 'text' : 'password'} // Toggle password visibility
                    placeholder="Create a password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>
            </div>

            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
    rounded-md bg-[#004838] text-[#E2FB6C]"
              >
                Create Account
                <FaArrowRight className="ml-2 mt-1" />
              </button>
            </div>

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
      <div className="w-1/2 h-screen border-[5px]  rounded-lg mt-40 border-t-[#004838] border-l-[#004838]">
        <img
          src={img}
          alt="Background"
          className="w-full h-full"  
          style={{ objectPosition: "top left" }} 
        />
      </div>

    </div>
  );
}

export default SignUp;
