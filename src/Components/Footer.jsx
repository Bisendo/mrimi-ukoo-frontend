import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center md:text-left">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          
          {/* Family Info */}
          <div>
            <h3 className="text-base font-semibold text-yellow-400 mb-1">Mrimi Ukoo</h3>
            <p className="text-xs text-gray-300">Strengthening family bonds & building a legacy.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-yellow-400 mb-1">Links</h3>
            <ul className="text-gray-300 text-xs space-y-1">
              <li><a href="/" className="hover:text-yellow-400">Home</a></li>
              <li><a href="/" className="hover:text-yellow-400">About</a></li>
              <li><a href="/" className="hover:text-yellow-400">Events</a></li>
              <li><a href="/" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </div>
          
          {/* Social & Newsletter */}
          <div>
            <h3 className="text-base font-semibold text-yellow-400 mb-1">Follow</h3>
            <div className="flex justify-center md:justify-start space-x-3">
              <a href="https://facebook.com" className="text-lg text-gray-400 hover:text-blue-500">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-lg text-gray-400 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-lg text-gray-400 hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
            <div className="hidden md:block mt-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-2 py-1 text-black rounded text-xs focus:outline-none"
              />
              <button className="w-full mt-2 bg-yellow-400 text-black py-1 rounded font-semibold text-xs hover:bg-yellow-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-3 text-gray-400 mt-4 border-t border-gray-700 text-xs">
        <p>© 2025 Mrimi Ukoo | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
