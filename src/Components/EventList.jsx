import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
    location: "",
  });
  const [isViewMode, setIsViewMode] = useState(false); // Added view mode state

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4040/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Format date as month and year (e.g., "January 2025")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  // Handle selecting an event (view or edit mode)
  const handleSelectEvent = (event, viewMode = false) => {
    setSelectedEvent({ ...event });
    setIsCreating(false);
    setIsViewMode(viewMode); // Set to view mode if needed
  };

  // Handle closing event details or edit form
  const handleCloseDetails = () => {
    setSelectedEvent(null);
    setIsViewMode(false); // Reset view mode when closing
  };

  // Handle input changes for the new event form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  // Submit the new event
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("description", newEvent.description);
    if (newEvent.image) {
      formData.append("image", newEvent.image);
    }
    formData.append("date", newEvent.date);
    formData.append("location", newEvent.location);

    try {
      await axios.post("http://localhost:4040/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsCreating(false);
      setNewEvent({
        title: "",
        description: "",
        image: null,
        date: "",
        location: "",
      });
      // Re-fetch events after adding
      const response = await axios.get("http://localhost:4040/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Handle date change (for editing)
  const handleDateChange = (e) => {
    setSelectedEvent({
      ...selectedEvent,
      date: e.target.value,
    });
  };

  // Handle changes to event details (edit form)
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  // Submit the edited event
  const handleSubmitEditEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", selectedEvent.title);
    formData.append("description", selectedEvent.description);
    if (selectedEvent.image) {
      formData.append("image", selectedEvent.image);
    }
    formData.append("date", selectedEvent.date);
    formData.append("location", selectedEvent.location);

    try {
      await axios.put(
        `http://localhost:4040/events/${selectedEvent.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Re-fetch events after editing
      const response = await axios.get("http://localhost:4040/events");
      setEvents(response.data);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/events/${id}`);
      // Re-fetch events after deletion
      const response = await axios.get("http://localhost:4040/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Event Create Form */}
      {isCreating ? (
        <form
          onSubmit={handleSubmitEvent}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date
            </label>
            <input
              type="month"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Event Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image
            </label>
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
            Create Event
          </button>
        </form>
      ) : (
        <div className="space-y-4 p-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {event.title}
              </h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-500">Date: {formatDate(event.date)}</p>
              <p className="text-gray-500">Location: {event.location}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleSelectEvent(event, true)} // View mode enabled
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSelectEvent(event, false)} // Edit mode enabled
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Detail / Edit Form */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={handleCloseDetails}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {isViewMode ? "View Event" : "Edit Event"}
            </h2>

            {/* View Mode (Display Event Details) */}
            {isViewMode ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-900 text-lg">{selectedEvent.title}</p>
                </div>
                <div>
                  <p className="text-gray-900">{selectedEvent.description}</p>
                </div>
                <div>
                  <p className="text-gray-900">
                    {formatDate(selectedEvent.date)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-900">{selectedEvent.location}</p>
                </div>
                {/* Check if the event has an image and display it */}
                {selectedEvent.image && (
                  <div>
                    <img
                      src={`http://localhost:4040/uploads/${selectedEvent.image}`} // Assuming the image is hosted on your backend
                      alt="Event"
                      className="mt-2 max-w-full h-auto rounded-md"
                    />
                  </div>
                )}
              </div>
            ) : (
              // Edit Mode (Display Form)
              <form onSubmit={handleSubmitEditEvent}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={selectedEvent.title}
                    onChange={handleEditChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={selectedEvent.description}
                    onChange={handleEditChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Date
                  </label>
                  <input
                    type="month"
                    id="date"
                    name="date"
                    value={selectedEvent.date}
                    onChange={handleDateChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={selectedEvent.location}
                    onChange={handleEditChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        image: e.target.files[0],
                      })
                    }
                    className="w-full mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Event
                </button>
              </form>
            )}

            {/* Toggle between view and edit modes */}
            <div className="mt-4">
              <button
                onClick={() => setIsViewMode(!isViewMode)} // Toggle view mode
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                {isViewMode ? "Edit Event" : "View Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
