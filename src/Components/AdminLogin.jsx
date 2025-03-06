import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4040/autho/login', {
        email,
        password,
      });

      if (response.status === 200) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Incorrect email or password.');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <nav className="bg-gradient-to-r from-red-600 to-green-600 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-white tracking-wider">Admin Panel</h1>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden  flex items-center">
              <div ref={dropdownRef}>
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                  <svg
                    className={`h-6 w-6 transition-transform transform ${isMenuOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-red-600  text-white rounded-md shadow-lg overflow-hidden z-10">
                    <a href="/admin" className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-700">Login</a>
                    <a href="/" className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-700">Home</a>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex space-x-6">
              <a href="/admin" className="text-white hover:text-gray-200 transition-all">Login</a>
              <a href="/" className="text-white hover:text-gray-200 transition-all">Home</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 flex justify-center items-center px-4">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full transform transition-all hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-yellow-600 text-white py-2 rounded-md hover:scale-105 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;