import React from 'react';

const EventActions = ({ event }) => {
  const handleDelete = () => {
    console.log(`Deleting event: ${event.title}`);
    // You can replace this with an API call to delete the event
  };

  const handleUpdate = () => {
    console.log(`Updating event: ${event.title}`);
    // You can replace this with an API call to update the event
  };

  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Update Event
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Delete Event
      </button>
    </div>
  );
};

export default EventActions;
