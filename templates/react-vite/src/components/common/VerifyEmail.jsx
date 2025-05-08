import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { selectAccount } from '../../app/DashboardSlice';
import { authEmail } from '../../services/repository/userRepo';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Timer } from 'lucide-react';

const VerifyEmail = () => {
  let [otp, setOtp] = useState('');
  const acc = useSelector(selectAccount);
  console.log(acc);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    dispatch(authEmail(acc.id, otp, navigate));
  };
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={''} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/0 to-emerald-800/0 backdrop-blur-[0.3rem]"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-avocado/100 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="p-3 bg-green-400/20 rounded-full">
                <svg
                  className="w-8 h-8 text-green-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V10a2 2 0 012-2h14.2M7 15l5 5 9-9" />
                </svg>
              </div>
            </div>

            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-green-100 text-center mb-8">
              We've sent a verification code to your email. Please enter it
              below.
            </p>

            {/* Form */}
            <form onSubmit={handleVerifyAndSignup} className="space-y-6">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="0"
                    className="w-14 h-14 mx-1 text-center text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-bold text-xl"
                  />
                )}
                containerStyle={{
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              />

              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                Verify Email
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between text-green-100">
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Signup
              </Link>

              <button
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                onClick={() => {
                  // Handle resend logic
                }}
              >
                <Timer className="w-4 h-4" />
                Resend Code
              </button>
            </div>

            {/* Extra Info */}
            <p className="mt-6 text-sm text-center text-green-100">
              Didn't receive the code? Check your spam folder or{' '}
              <button className="text-green-400 hover:text-green-300">
                request a new one
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
