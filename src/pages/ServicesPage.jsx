import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../Components/Navibar'; // Import Navbar
import BackgroundImage1 from "../assets/images/three.jpg";
import BackgroundImage2 from "../assets/images/one.png"; // Add a second background image

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(BackgroundImage1); // Default background image

  useEffect(() => {
    // Change background after 5 seconds
    const timer = setTimeout(() => {
      setBackgroundImage(BackgroundImage2); // Change to the second background image
    }, 5000);

    // Cleanup timer when component unmounts or if background changes
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch services from the backend using axios
    axios
      .get('http://localhost:4040/service') // Make sure the endpoint is correct
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setError('An error occurred while fetching services.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="mt-24"> {/* Adjusted margin to separate Navbar and Hero section */}
        <section
          className="relative bg-cover bg-center h-[500px] rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${backgroundImage})` }} // Set background dynamically
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold text-shadow-xl animate__animated animate__fadeIn">
              Our Services
            </h1>
            <p className="text-2xl mt-4 animate__animated animate__fadeIn animate__delay-1s">
              Serving the community with faith, compassion, and commitment.
            </p>
          </div>
        </section>
      </div>

      {/* Service List Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">Explore Our Services</h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-xl text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <img
                  src={`http://localhost:4040${service.image}`}
                  alt={service.name}
                  className="w-full h-56 object-cover rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <a
                    href="/contact"
                    className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Get Involved
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">About Us</h4>
              <p className="text-white text-sm">
                We are a church committed to serving our community and growing in faith. Join us for our services and events.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h4>
              <ul>
                <li><a href="/about" className="text-white hover:text-gray-200 text-sm">About Us</a></li>
                <li><a href="/services" className="text-white hover:text-gray-200 text-sm">Our Services</a></li>
                <li><a href="/events" className="text-white hover:text-gray-200 text-sm">Events</a></li>
                <li><a href="/contact" className="text-white hover:text-gray-200 text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Contact Us</h4>
              <p className="text-white text-sm">
                Email: info@church.com <br />
                Phone: +255 621 690 364
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-white hover:text-gray-200">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com" className="text-white hover:text-gray-200">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com" className="text-white hover:text-gray-200">
                  <FaTwitter size={24} />
                </a>
                <a href="https://linkedin.com" className="text-white hover:text-gray-200">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-white mt-8">
            <p>&copy; 2025 Your Church Name. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
