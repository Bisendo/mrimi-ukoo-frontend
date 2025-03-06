import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navibar"; // Assuming the same Navbar component
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",  // Replaced password with phone
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4040/members/login", formData);
      console.log("Login successful:", response.data);
      setFormData({ username: "", phone: "" });
      setError("");

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard or home page
      navigate("/members");  
    } catch (error) {
      console.error("Error during login:", error);

      // Check if the error is related to incorrect credentials
      if (error.response && error.response.status === 401) {
        setError("Incorrect username or phone number. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
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
        {/* Login Form Section */}
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

              {/* Username input */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username</label>
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

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-yellow-600 text-white py-2 rounded-md"
              >
                Login
              </button>
              
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/registrations" className="text-blue-600 hover:text-blue-700">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
