import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 pb-4 border-b border-gray-700">
              <a href="https://facebook.com" className="text-2xl text-gray-400 hover:text-blue-500">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-2xl text-gray-400 hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-2xl text-gray-400 hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          {/* Family Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400">Mrimi Ukoo Family</h3>
            <p className="text-sm text-gray-300">
              Strengthening family bonds and building a legacy of faith, love, and unity.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400">Contact Us</h3>
            <p className="text-sm text-gray-300">Location: Tanzania, East Africa</p>
            <p className="text-sm text-gray-300">Phone: +255 123 456 789</p>
            <p className="text-sm text-gray-300">Email: info@mrimiukoo.com</p>
          </div>
        </div>
      </div>
      
      <div className="text-center py-4 text-gray-400 mt-8 border-t border-gray-700">
        <p className="text-sm">© 2025 Mrimi Ukoo Family | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
