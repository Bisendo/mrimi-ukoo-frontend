import React, { useState } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Navbar from "../Components/Navibar"; // Import Navbar component
import backImage from "../assets/images/contact2.jpg"; // Import map image

const Contact = ({ onAddContact }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4040/contacts", {
        username,
        email,
        message,
        phoneNumber,
      });

      if (response.status === 200 || response.status === 201) {
        onAddContact && onAddContact(response.data); // Call callback if provided
        setUsername("");
        setEmail("");
        setMessage("");
        setPhoneNumber("");
        setError("");
        setSuccess();
        alert("Message sent successfully");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <div className="mt-24">
        {/* Hero Section */}
        <section
          id="home"
          className="relative bg-cover bg-center h-screen rounded-lg"
          style={{ backgroundImage: `url(${backImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
            <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-lg mb-8">We'd love to hear from you!</p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 px-6 text-center bg-white shadow-lg rounded-lg mx-4 mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions or need assistance? Reach out to us through the form below or use the contact details provided.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">123 Church St, City, Country</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">info@mrimiukoofamily.com</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 border rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border rounded-lg shadow-sm"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 border rounded-lg shadow-sm"
                rows="4"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-4 border rounded-lg shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Map Section */}
        <section className="py-16 px-6 text-center bg-white mt-16 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Location</h2>
          <div className="max-w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15752.61174440034!2d39.268368939618775!3d-6.8833582403805955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c59d8b8f4a315%3A0x5e0e548a5311846d!2sGilgal%20Revival%20Church%2C%20Gongolamboto%2C%20Ulongoni%20Kwa%20Swai%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1634313442327!5m2!1sen!2stz"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Gilgal Revival Church Location"
            ></iframe>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">About Us</h4>
              <p className="text-white text-sm">
                We are a family committed to serving our community and growing in faith. Join us for our services and events.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h4>
              <ul>
                <li><a href="/about" className="text-white hover:text-gray-200 text-sm">About Us</a></li>
                <li><a href="/ministries" className="text-white hover:text-gray-200 text-sm">Our Ministries</a></li>
                <li><a href="/events" className="text-white hover:text-gray-200 text-sm">Events</a></li>
                <li><a href="/contact" className="text-white hover:text-gray-200 text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Contact Us</h4>
              <p className="text-white text-sm">
                Email: info@mrimiukoofamily.com <br />
                Phone: +123 456 7890
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
            <p>&copy; 2025 Mrimi Ukoo Family. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
