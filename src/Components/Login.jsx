import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../Authentication/authentication';
import { authContext } from '../Context/authContext';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(authContext)

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      setUser(response);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 w-full">
      <div className="flex w-full">
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <div className="text-center transform transition-transform duration-500 hover:scale-105">
            <h1 className="text-5xl font-bold text-white">Welcome Back!</h1>
            <p className="mt-4 text-xl text-gray-300">We're happy to see you again. Please login to continue.</p>
            <p className="mt-2 text-sm text-gray-400">If you don't have an account, please register first.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-1/2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={sendData}>
              <div>
                <label className="block text-sm font-medium text-black" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-500"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  value={email}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-500"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  value={password}
                  disabled={loading}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
