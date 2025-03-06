import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMail, FiPhone, FiTrash2, FiSearch, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom"; // Assuming React Router is being used

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:4040/contacts");
        setContacts(response.data);
      } catch (err) {
        setError("Failed to fetch contacts.");
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    // Logic to delete contact (placeholder)
    console.log(`Delete contact with id: ${id}`);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back to Dashboard Link */}
      <div className="mb-6">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Submissions</h3>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-lg shadow-md mb-6">
        <FiSearch className="text-gray-500 ml-4" size={20} />
        <input
          type="text"
          placeholder="Search contacts..."
          className="flex-1 p-3 border-none focus:ring-0 focus:outline-none rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contact List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h4 className="text-xl font-semibold text-gray-800">{contact.username}</h4>
            <p className="text-gray-600 flex items-center mt-2">
              <FiMail className="mr-2" />
              {contact.email}
            </p>
            <p className="text-gray-600 flex items-center mt-2">
              <FiPhone className="mr-2" />
              {contact.phoneNumber}
            </p>
            <p className="text-gray-600 mt-4">{contact.message}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center"
                onClick={() => handleDelete(contact.id)}
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Pagination (optional) */}
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
};

export default ContactAdmin;
