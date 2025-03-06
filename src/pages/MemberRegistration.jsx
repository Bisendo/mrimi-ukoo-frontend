import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navibar";
import { useNavigate } from "react-router-dom";

const MemberRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    gender: "",  // Added gender field
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:4040/members", formData);
      console.log("Registration successful:", response.data);
      setFormData({ username: "", phone: "", gender: "" });
      setError("");  // Clear any previous error messages
      navigate("/Login");  // Redirect to the login page after successful registration
    } catch (error) {
      console.error("Error during registration:", error);
  
      // Check if the error is a conflict (duplicate record, such as username or phone number)
      if (error.response && error.response.status === 409) {
        setError("This username or phone number is already in use. Please try another.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };
  

  return (
    <div className="bg-gray-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Adjust content for fixed navbar */}
      <div className="pt-16">
        {/* Registration Form Section */}
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
              
              {/* Full name input */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              {/* Phone number input */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              {/* Gender dropdown */}
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-yellow-600 text-white py-2 rounded-md"
              >
                Register
              </button>
            </form>

            {/* Link to Login Page */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:text-blue-700">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberRegistration;
