import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailID, setEmailId] = useState("akshaysaini@gmail.com");
  const [password, setPassword] = useState("Akshay#saini@1210");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        emailID,
        password
      }, { withCredentials: true });

      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
      <div className="card bg-white/90 backdrop-blur-md w-full max-w-md shadow-2xl border border-white/20">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <label className="input input-bordered flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2" strokeWidth="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                className="grow"
                value={emailID}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            {/* Password Field */}
            <label className="input input-bordered flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
              <input
                type="password"
                placeholder="Password"
                required
                className="grow"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {/* Submit Button */}
            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full text-lg tracking-wide hover:scale-105 transition-transform">
                Login
              </button>
            </div>
          </form>

          {/* Extra Links */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
