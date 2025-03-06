import React from 'react';
import EventActions from './EventAction';
const EventDetail = ({ event, handleClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold">{event.title}</h2>
        <p className="mt-4 text-gray-600">Date: {event.date}</p>
        <p className="mt-2 text-gray-600">Location: {event.location}</p>
        <p className="mt-2">{event.description}</p>

        <EventActions event={event} />
        <button
          onClick={handleClose}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
