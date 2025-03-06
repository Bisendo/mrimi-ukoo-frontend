import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FiArrowLeft } from 'react-icons/fi'; // Import icon for back navigation
import EventList from './EventList';
import EventCreateForm from './EventCreateForm';
import EventDetail from './EventDetail';

const AdminEventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateEvent = () => {
    setIsCreating(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsCreating(false); // Disable create form when viewing event details
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header with a back button */}
      <div className="flex justify-between items-center p-6 bg-blue-800 text-white">
        <div className="flex items-center">
          <Link to="/admin/dashboard" className="flex items-center text-white hover:text-gray-300 transition-colors">
            <FiArrowLeft className="mr-2 text-xl" />
            <span className="hidden sm:block">Back to Dashboard</span>
          </Link>
        </div>
        <h1 className="text-2xl font-semibold">Manage Events</h1>
        <button
          onClick={handleCreateEvent}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Event
        </button>
      </div>

      {/* Event Create Form or Event List */}
      <div className="flex-1 p-6">
        {isCreating ? (
          <EventCreateForm />
        ) : (
          <EventList handleSelectEvent={handleSelectEvent} />
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetail event={selectedEvent} handleClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default AdminEventPage;
