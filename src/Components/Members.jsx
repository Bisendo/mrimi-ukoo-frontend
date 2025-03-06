import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminMemberPage = () => {
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showForm, setShowForm] = useState(false);  // State to toggle the form
  const [newMember, setNewMember] = useState({
    username: "",
    phone: "",
    gender: "Male",
  });

  // Fetch members and total member count from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:4040/members");
        setMembers(response.data);
        setTotalMembers(response.data.length);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleSelectMember = (member) => setSelectedMember(member);
  const handleCloseDetails = () => setSelectedMember(null);

  const handleDeleteMember = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this member?")) {
        await axios.delete(`http://localhost:4040/member/${id}`);
        setMembers(members.filter((member) => member.id !== id));
        setTotalMembers(totalMembers - 1);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Handle new member form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit new member form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4040/members", newMember);
      setMembers([...members, response.data]); // Add the new member to the state
      setTotalMembers(totalMembers + 1); // Update total member count
      setShowForm(false); // Close the form after submission
      setNewMember({ username: "", phone: "", gender: "Male" }); // Reset form
    } catch (error) {
      console.error("Error adding new member:", error);
    }
  };

  // Format the date and time for a member
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString();
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">Manage Members</h1>
      </div>

      <div className="p-6">
        {/* Navigation Links */}
        <div className="flex justify-between mb-6">
          <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-700 text-lg">
            Back to Admin Dashboard
          </Link>
          <button
            onClick={() => setShowForm(!showForm)} // Toggle form visibility
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {showForm ? "Cancel" : "Create New Member"}
          </button>
        </div>

        {/* Show Form if `showForm` is true */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Create New Member</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newMember.username}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={newMember.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={newMember.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Member
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Total Registered Members</h2>
          <div className="flex items-center">
            <FiUsers className="text-4xl text-blue-600 mr-4" />
            <p className="text-3xl font-bold">{totalMembers}</p>
          </div>
        </div>

        {/* Table for displaying members */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Date Joined</th>
                <th className="px-4 py-2 text-left">Time Joined</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{member.id}</td>
                  <td className="px-4 py-2">{member.username}</td>
                  <td className="px-4 py-2">{member.phone}</td>
                  <td className="px-4 py-2">{member.gender}</td>
                  <td className="px-4 py-2">{formatDate(member.createdAt)}</td>
                  <td className="px-4 py-2">{formatTime(member.createdAt)}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button onClick={() => handleSelectMember(member)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center">
                        <FiEye className="mr-1" />
                        View
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md flex items-center">
                        <FiEdit className="mr-1" />
                        Edit
                      </button>
                      <button onClick={() => handleDeleteMember(member.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center">
                        <FiTrash2 className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{selectedMember.username}</h2>
              <button onClick={handleCloseDetails} className="text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-4">Phone: {selectedMember.phone}</p>
            <p className="text-gray-700 mb-4">Gender: {selectedMember.gender}</p>
            <p className="text-gray-700 mb-4">
              Joined on: {formatDate(selectedMember.createdAt)} at {formatTime(selectedMember.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMemberPage;
