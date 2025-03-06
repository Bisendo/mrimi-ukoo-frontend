import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaInfoCircle, FaUsers, FaCalendarAlt, FaPhone, 
  FaUserShield, FaBell, FaBars, FaTimes, FaHome, FaCreditCard, FaCaretDown
} from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-l from-yellow-800 to-amber-400 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo & Name */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-900 to-blue-400 rounded-full flex justify-center items-center text-white">
              <span className="text-lg text-white font-black">MUF</span>
            </div>
            <h1 className="text-2xl font-bold hidden sm:block">Mrimi Ukoo Family</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link to="/services" className="hover:text-yellow-300 transition">Services</Link>
          
          {/* Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="flex items-center hover:text-yellow-300 transition"
            >
              <span>More</span> 
              <FaCaretDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 transition-transform transform origin-top-right">
                <Link to="/events" className="block px-4 py-2 text-sm hover:bg-gray-100">Events</Link>
                <Link to="/contact" className="block px-4 py-2 text-sm hover:bg-gray-100">Contact</Link>
                <Link to="/members" className="block px-4 py-2 text-sm hover:bg-gray-100">Members</Link>
                <Link to="/debts" className="block px-4 py-2 text-sm hover:bg-gray-100">Debts</Link>
              </div>
            )}
          </div>

          <Link to="/admin" className="hover:text-yellow-300 transition">Admin</Link>

          {/* Notifications */}
          <div className="relative">
            <FaBell 
              className="w-6 h-6 cursor-pointer hover:text-yellow-300 transition" 
              onClick={toggleNotification} 
            />
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg py-2">
                <p className="px-4 py-2 text-sm border-b">No new notifications</p>
                <p className="px-4 py-2 text-sm text-red-600 cursor-pointer hover:text-red-800">View all</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 w-2/3 h-full bg-red-700 text-white shadow-lg transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute top-5 right-5 text-white" onClick={toggleMobileMenu}>
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-start mt-16 space-y-6 px-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaInfoCircle /> <span>About</span>
          </Link>
          <Link to="/services" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaUsers /> <span>Service</span>
          </Link>
          <Link to="/events" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaCalendarAlt /> <span>Events</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaPhone /> <span>Contact</span>
          </Link>
         
          <Link to="/members" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaUsers /> <span>Members</span> {/* Added Members link with icon */}
          </Link>

          <Link to="/debts" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaCreditCard  /> <span>Debts</span> {/* Added Debts link with icon */}
          </Link>

          <Link to="/admin" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaUserShield /> <span>Admin</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
