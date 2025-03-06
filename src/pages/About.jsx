import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navibar";
import { FaFacebook, FaInstagram, FaTwitter,FaLinkedin} from "react-icons/fa"; // Importing Font Awesome icons
import BackgroundImage1 from "../assets/images/three.jpg";
import BackgroundImage2 from "../assets/images/one.png"; // Add a second background image

// Helper component to animate each letter sequentially
const AnimatedText = ({ text }) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </>
  );
};

const About = () => {
  const [leaders, setLeaders] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(BackgroundImage1); // Default background image

  // Fetch leaders from the API on component mount
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await axios.get("http://localhost:4040/leaders");
        setLeaders(response.data); // Store the fetched leaders in state
      } catch (error) {
        console.error("Error fetching leaders:", error);
        alert("Failed to load leaders. Please try again.");
      }
    };
    fetchLeaders();
  }, []);

  // Change background image after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundImage(BackgroundImage2); // Change to the second background image
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="bg-gray-50 font-sans">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-16 mt-8">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center min-h-[70vh] sm:min-h-screen flex items-center justify-center animate__animated animate__fadeIn animate__delay-1s"
          style={{ backgroundImage: `url(${backgroundImage})` }} // Set background dynamically
        >
          <a
            href="https://www.youtube.com/@mrimumkoofamily"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black opacity-0"
            aria-label="Visit our YouTube Channel"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl font-bold mb-6">
              <AnimatedText text="About Mrimi Ukoo Family" />
            </h1>
            <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-3s">
              A legacy of unity, love, and togetherness across generations.
            </p>
            <div className="space-x-4">
              <a
                href="/services"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              >
                Join Our Family Events
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-400 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 bg-gray-100 text-center animate__animated animate__fadeIn animate__delay-3s">
  <h2 className="text-4xl font-bold text-gray-800 mb-10">
    Meet Our Family Leaders
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Display the leaders from the state */}
    {leaders.map((leader, index) => (
      <div
        key={index}
        className="bg-white shadow-xl rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
        <img
          src={`http://localhost:4040${leader.image}`}
          alt={leader.name}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4 z-10"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2 z-10">
          {leader.name}
        </h3>
        <p className="text-gray-600 mb-4 z-10">{leader.role}</p>
        <p className="text-gray-500 z-10">{leader.description}</p>
      </div>
    ))}
  </div>
</section>


        {/* Footer Section */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h4 className="text-xl font-semibold text-yellow-400 mb-4">
                  About Us
                </h4>
                <p className="text-white text-sm">
                  We are a family committed to serving our community and growing
                  in faith. Join us for our services and events.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-semibold text-yellow-400 mb-4">
                  Quick Links
                </h4>
                <ul>
                  <li>
                    <a
                      href="/about"
                      className="text-white hover:text-gray-200 text-sm"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ministries"
                      className="text-white hover:text-gray-200 text-sm"
                    >
                      Our Ministries
                    </a>
                  </li>
                  <li>
                    <a
                      href="/events"
                      className="text-white hover:text-gray-200 text-sm"
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-white hover:text-gray-200 text-sm"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-xl font-semibold text-yellow-400 mb-4">
                  Contact Us
                </h4>
                <p className="text-white text-sm">
                  Email: info@mrimiukoofamily.com <br />
                  Phone: +123 456 7890
                </p>
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="text-xl font-semibold text-yellow-400 mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    className="text-white hover:text-gray-200"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="text-white hover:text-gray-200"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="text-white hover:text-gray-200"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="text-white hover:text-gray-200"
                  >
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
    </div>
  );
};

export default About;
