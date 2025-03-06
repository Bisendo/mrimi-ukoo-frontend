import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const AdminMinistriesPage = () => {
  const [ministries, setMinistries] = useState([]);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newMinistry, setNewMinistry] = useState({
    name: '',
    description: '',
    image: null,
  });

  // Fetch ministries from the backend API
  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const response = await axios.get('http://localhost:4040/ministries');
        setMinistries(response.data);
      } catch (error) {
        console.error('Error fetching ministries:', error);
      }
    };
    fetchMinistries();
  }, []);

  // Handle creating a new ministry
  const handleCreateMinistry = () => {
    setIsCreating(true);
  };

  // Handle selecting a ministry
  const handleSelectMinistry = (ministry) => {
    setSelectedMinistry(ministry);
    setIsCreating(false);
  };

  // Handle closing ministry details
  const handleCloseDetails = () => {
    setSelectedMinistry(null);
  };

  // Handle input changes for the new ministry form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMinistry({ ...newMinistry, [name]: value });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    setNewMinistry({ ...newMinistry, image: e.target.files[0] });
  };

  // Submit the new ministry
  const handleSubmitMinistry = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newMinistry.name);
    formData.append('description', newMinistry.description);
    if (newMinistry.image) {
      formData.append('image', newMinistry.image);
    }

    try {
      await axios.post('http://localhost:4040/ministries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsCreating(false);
      setNewMinistry({ name: '', description: '', image: null });
      // Re-fetch ministries after adding
      const response = await axios.get('http://localhost:4040/ministries');
      setMinistries(response.data);
    } catch (error) {
      console.error('Error creating ministry:', error);
    }
  };

  // Handle deleting a ministry
  const handleDeleteMinistry = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/ministries/${id}`);
      // Re-fetch ministries after deleting
      const response = await axios.get('http://localhost:4040/ministries');
      setMinistries(response.data);
    } catch (error) {
      console.error('Error deleting ministry:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex justify-between items-center p-6 bg-blue-800 text-white">
        <div className="flex items-center">
          <Link to="/admin/dashboard" className="flex items-center text-white hover:text-gray-300 transition-colors">
            <FiArrowLeft className="mr-2 text-xl" />
            <span className="hidden sm:block">Back to Dashboard</span>
          </Link>
        </div>
        <h1 className="text-2xl font-semibold">Manage Ministries</h1>
        <button
          onClick={handleCreateMinistry}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Ministry
        </button>
      </div>

      {/* Ministry Create Form */}
      {isCreating ? (
        <form onSubmit={handleSubmitMinistry} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Ministry</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ministry Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newMinistry.name}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Ministry Description</label>
            <textarea
              id="description"
              name="description"
              value={newMinistry.description}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Ministry Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Ministry
          </button>
        </form>
      ) : (
        <div className="space-y-4 p-6">
          {ministries.map((ministry) => (
            <div
              key={ministry.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800">{ministry.name}</h3>
              <p className="text-gray-600">{ministry.description}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleSelectMinistry(ministry)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteMinistry(ministry.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ministry Detail */}
      {selectedMinistry && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={handleCloseDetails}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedMinistry.name}</h2>
            <p className="text-gray-700">{selectedMinistry.description}</p>
            {selectedMinistry.image && (
              <img
                src={`http://localhost:4040/uploads/${selectedMinistry.image}`}
                alt={selectedMinistry.name}
                className="mt-4 w-full h-auto"
              />
            )}
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Edit Ministry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMinistriesPage;
