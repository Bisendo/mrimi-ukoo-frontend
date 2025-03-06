import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import givingImage from '../assets/images/fives.jpg'; // Import image for the background
import Navbar from '../Components/Navibar';

const Giving = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [donationOption, setDonationOption] = useState(''); // State to track selected donation option

  // Function to open the modal with the selected donation option
  const openModal = (option) => {
    setDonationOption(option);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const renderModalContent = () => {
    switch (donationOption) {
      case 'vodacom':
        return (
          <div>
            <h4 className="font-semibold">Vodacom M-Pesa Instructions</h4>
            <p className="text-gray-600 mb-4">
              1. Dial <strong>*150*00#</strong> on your Vodacom line.<br />
              2. Select "Pay by M-Pesa."<br />
              3. Enter the business number <strong>123456</strong>.<br />
              4. Enter the reference number <strong>ChurchDonation</strong>.<br />
              5. Enter your donation amount.<br />
              6. Confirm and complete the transaction.
            </p>
          </div>
        );
      case 'halotel':
        return (
          <div>
            <h4 className="font-semibold">Halotel HaloPesa Instructions</h4>
            <p className="text-gray-600 mb-4">
              1. Dial <strong>*150*88#</strong> on your Halotel line.<br />
              2. Select "Make Payments."<br />
              3. Enter the business number <strong>789101</strong>.<br />
              4. Enter the reference number <strong>ChurchDonation</strong>.<br />
              5. Enter your donation amount.<br />
              6. Confirm and complete the transaction.
            </p>
          </div>
        );
      case 'tigo':
        return (
          <div>
            <h4 className="font-semibold">Tigo Pesa Instructions</h4>
            <p className="text-gray-600 mb-4">
              1. Dial <strong>*150*01#</strong> on your Tigo line.<br />
              2. Select "Lipa na Tigo Pesa."<br />
              3. Enter the business number <strong>234567</strong>.<br />
              4. Enter the reference number <strong>ChurchDonation</strong>.<br />
              5. Enter your donation amount.<br />
              6. Confirm and complete the transaction.
            </p>
          </div>
        );
      case 'airtel':
        return (
          <div>
            <h4 className="font-semibold">Airtel Money Instructions</h4>
            <p className="text-gray-600 mb-4">
              1. Dial <strong>*150*60#</strong> on your Airtel line.<br />
              2. Select "Make Payments."<br />
              3. Enter the business number <strong>345678</strong>.<br />
              4. Enter the reference number <strong>ChurchDonation</strong>.<br />
              5. Enter your donation amount.<br />
              6. Confirm and complete the transaction.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="mt-24">
        <section
          className="relative bg-cover bg-center h-96"
          style={{ backgroundImage: `url(${givingImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
            <h1 className="text-5xl font-bold mb-4">Give to Support the Ministry</h1>
            <p className="text-xl mb-8">Your generosity helps us to continue serving the community and spreading the gospel.</p>
          </div>
        </section>
      </div>

      {/* Giving Options Section */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">How You Can Give</h2>
        <p className="text-lg text-gray-600 mb-8">
          There are many ways you can contribute to the ministry. Choose the option that works best for you!
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {['vodacom', 'halotel', 'tigo', 'airtel'].map((provider) => (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs" key={provider}>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{provider.charAt(0).toUpperCase() + provider.slice(1)} Mobile Money</h3>
              <p className="text-gray-600 mb-4">
                Donate conveniently using {provider.charAt(0).toUpperCase() + provider.slice(1)} mobile money services.
              </p>
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                onClick={() => openModal(provider)}
              >
                Give Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal (Popup) for giving details */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-96 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Giving Instructions</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your willingness to support our ministry. Please follow the steps below based on your chosen method:
            </p>
            {renderModalContent()}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h4 className="text-xl font-semibold mb-4">About Us</h4>
              <p className="text-white text-sm">
                We are a church committed to serving our community and growing in faith. Join us for our services and events.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul>
                <li><a href="/about" className="text-white hover:text-white text-sm">About Us</a></li>
                <li><a href="/ministries" className="text-white hover:text-white text-sm">Our Ministries</a></li>
                <li><a href="/events" className="text-white hover:text-white text-sm">Events</a></li>
                <li><a href="/contact" className="text-white hover:text-white text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p className="text-white text-sm">
                Email: info@church.com <br />
                Phone: +123 456 7890
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-white hover:text-white">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com" className="text-white hover:text-white">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com" className="text-white hover:text-white">
                  <FaTwitter size={24} />
                </a>
                <a href="https://linkedin.com" className="text-white hover:text-white">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-white mt-8">
            <p>&copy; 2025 Your Church Name. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Giving;
