import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const EventCreateForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: null, // State for the image file
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      // Handle file input separately
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const eventData = new FormData();
    Object.keys(formData).forEach((key) => {
      eventData.append(key, formData[key]);
    });

    try {
      // Send the data to the backend API using axios
      const response = await axios.post('http://localhost:4040/events', eventData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type for file uploads
        },
      });

      if (response.status === 201) {
        console.log('Event Created:', response.data);
        navigate(0)
        // Optionally reset the form
        setFormData({
          title: '',
          date: '',
          location: '',
          description: '',
          image: null,
        });
      } else {
        console.error('Failed to create event');
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Event Form */}
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-2">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium">Event Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Upload Event Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreateForm;
