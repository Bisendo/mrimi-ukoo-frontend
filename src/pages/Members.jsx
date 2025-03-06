import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navibar";
import { motion } from "framer-motion";
import groupImage from "../assets/images/four.jpg";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMembers, setShowMembers] = useState(false); // Initially set to false (list hidden)
  const [showScrollButton, setShowScrollButton] = useState(false); // State for showing the scroll button

  // Fetch members from backend
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4040/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchMembers(); // Initial fetch
    const interval = setInterval(fetchMembers, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(
    (member) =>
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.isLeader ? "group leader" : "normal member").includes(
        searchTerm.toLowerCase()
      )
  );

  // Total number of members
  const totalMembers = members.length;

  // Scroll button visibility handler
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar hideMembersLink />
      </div>

      {/* Page Content */}
      <div className="pt-24 max-w-5xl mx-auto p-6">
        {/* Member Info Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-l from-amber-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between"
        >
          {/* Left Side Image */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <img
              src={groupImage} // Replace with your image URL
              alt="Group"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side Content */}
          <div className="sm:w-3/4 ml-0 sm:ml-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold">Total Members</h2>
              <p className="text-4xl font-bold">{totalMembers}</p>
            </div>
            <p className="text-lg mb-6">
              This is the current count of members in your group. You can also
              search by username or status to find specific members.
            </p>
            <button
              onClick={() => setShowMembers(!showMembers)} // Toggle member list
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
            >
              {showMembers ? "Hide List" : "Show List"}
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        {showMembers && (
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md mb-6">
            <input
              type="text"
              placeholder="Search by username or status..."
              className="w-full border-none focus:outline-none p-2 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <p className="text-gray-600 text-center animate-pulse">Refreshing...</p>
        )}

        {/* Members Table */}
        {showMembers && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto bg-white shadow-lg rounded-lg"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-800 to-amber-400 text-white text-left">
                  <th className="py-3 px-4 border-b">ID</th>
                  <th className="py-3 px-4 border-b">Username</th>
                  <th className="py-3 px-4 border-b">Phone Number</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="py-3 px-4 border-b text-gray-800">
                        {member.id}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {member.username}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-600">
                        {member.phone}
                      </td>
                      <td
                        className={`py-3 px-4 border-b font-semibold ${
                          member.isLeader ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {member.isLeader ? "Group Leader" : "Normal Member"}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-600">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-600">
                        {new Date(member.createdAt).toLocaleTimeString()}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-3 px-4 text-gray-500">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default MemberList;
 