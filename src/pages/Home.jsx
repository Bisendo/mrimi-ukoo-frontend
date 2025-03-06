import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navibar";

// Import background images
import Bg1 from "../assets/images/eight.jpg";
import Bg2 from "../assets/images/four.jpg";
import Bg3 from "../assets/images/seven.jpg";
import Bg4 from "../assets/images/one.png";

const images = [
  { src: Bg1, caption: "Building a Stronger Community Together" },
  { src: Bg2, caption: "Embracing Faith, Love, and Unity" },
  { src: Bg3, caption: "Supporting and Empowering Generations" },
  { src: Bg4, caption: "Creating a Legacy for the Future" },
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4040/service");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>

      <div className={`pt-16 mt-8 ${menuOpen ? 'opacity-50' : ''}`}>
        <section className="relative h-[50vh] sm:h-[80vh] rounded-lg shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentImage].src})` }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 2 }}
            ></motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-6">
            <motion.div 
              className="border-b-2 border-white p-4 bg-black bg-opacity-0 "
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.h1 
                className="text-xl sm:text-3xl font-bold tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {images[currentImage].caption.split('').map((letter, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.05, delay: index * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-8 bg-gray-100 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Join Our Events & Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.length > 0 ? (
              services.map((service) => (
                <motion.div
                  key={service.id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {service.image ? (
                    <img
                      src={`http://localhost:4040${service.image}`}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <a
                    href="/events"
                    className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
                  >
                    View More →
                  </a>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No events available at the moment.</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
