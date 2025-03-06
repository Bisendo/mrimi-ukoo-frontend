import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Navbar from "../Components/Navibar";

// Importing images locally
import eventImage1 from '../assets/images/one.png';
import eventImage2 from '../assets/images/two.jpg';
import eventImage3 from '../assets/images/four.jpg';
import eventImage4 from '../assets/images/nine.jpg';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of imported background images
  const backgroundImages = [
    eventImage1,
    eventImage2,
    eventImage3,
    eventImage4,
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4040/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Change background image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
  
    fetchEvents();
  
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [backgroundImages.length]); // This empty array ensures the effect runs only once
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading events...
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Hero Section with Dynamic Background Image */}
      <section
  className="relative bg-cover bg-center h-screen rounded-lg mt-20 transition-all duration-500"
  style={{
    backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "15px",
  }}
>
  {/* Overlay for better text visibility */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

  <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
    <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
      Upcoming Events
    </h1>
    <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
      Join the Mrimi Ukoo Family for exciting and meaningful events.
    </p>
  </div>
</section>


      {/* Events Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Our Upcoming Events
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Join us for incredible gatherings and activities. From family events
          to community outreach, there's something for everyone!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={
                  event.image
                    ? `http://localhost:4040/uploads/${event.image}`
                    : "/path/to/placeholder-image.jpg"
                }
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-500 mb-4 text-xl font-semibold">
                {formatDate(event.date)}
              </p>
              <a
                href={`/event-details/${event.id}`}
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                View More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* About Us Section */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">About Us</h4>
              <p className="text-white text-sm">
                We are a vibrant family community, dedicated to building lasting
                relationships and making a positive impact. Join us for our
                events and activities!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h4>
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
                    href="/community"
                    className="text-white hover:text-gray-200 text-sm"
                  >
                    Our Community
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
              <h4 className="text-xl font-semibold text-yellow-400  mb-4">Contact Us</h4>
              <p className="text-white text-sm">
                Email: info@mrimiukoo.com <br />
                Phone: +255 621 690 364
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://web.facebook.com/mrimiukoo"
                  className="text-white hover:text-gray-200"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://instagram.com/mrimiukoo"
                  className="text-white hover:text-gray-200"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://twitter.com/mrimiukoo"
                  className="text-white hover:text-gray-200"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://www.youtube.com/mrimiukoo"
                  className="text-white hover:text-gray-200"
                >
                  <FaYoutube size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center text-white mt-8">
            <p>&copy; 2025 Mrimi Ukoo Family. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;
