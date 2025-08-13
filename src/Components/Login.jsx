import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailID, setEmailId] = useState("akshaysaini@gmail.com");
  const [password, setPassword] = useState("Akshay#saini@1210");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        emailID,
        password,
      }, { withCredentials: true });

      console.log(res.data);
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  return (
    // Main container with a vibrant, centered background
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
      {/* Login card with modern styling */}
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300 ease-in-out">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to your DevTinder account
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-300">
            <svg className="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={emailID}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-300">
            <svg className="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </svg>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold tracking-wide px-6 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:translate-y-[-2px]"
            >
              Login
            </button>
          </div>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-center text-gray-600 mt-8">
          Don’t have an account?{" "}
          <a href="/signup" className="font-semibold text-indigo-600 hover:underline transition-colors duration-200">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
