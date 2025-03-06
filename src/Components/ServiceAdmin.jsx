import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlus, FiTrash2, FiEye, FiEdit } from "react-icons/fi";

const AdminServicePage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [editingServiceId, setEditingServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4040/service");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleCreateService = () => setIsCreating(true);
  const handleSelectService = (service) => setSelectedService(service);
  const handleCloseDetails = () => setSelectedService(null);
  const handleInputChange = (e) => setNewService({ ...newService, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setNewService({ ...newService, image: e.target.files[0] });

  const handleDeleteService = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this service?")) {
        await axios.delete(`http://localhost:4040/service/${id}`);
        setServices(services.filter((service) => service.id !== id));
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEditService = (service) => {
    setIsEditing(true);
    setEditingServiceId(service.id);
    setNewService({
      title: service.title,
      description: service.description,
      image: null,
    });
  };

  const handleSubmitService = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newService.title);
    formData.append("description", newService.description);
    if (newService.image) {
      formData.append("image", newService.image);
    }

    try {
      if (isEditing) {
        // Update existing service
        const response = await axios.put(`http://localhost:4040/service/${editingServiceId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setServices(services.map(service => service.id === editingServiceId ? response.data : service));
        setIsEditing(false);
      } else {
        // Create new service
        const response = await axios.post("http://localhost:4040/service", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setServices([...services, response.data]);
      }
      setIsCreating(false);
      setNewService({ title: "", description: "", image: null });
    } catch (error) {
      console.error("Error creating/updating service:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link to="/admin/dashboard" className="flex items-center hover:text-gray-300 transition-colors">
            <FiArrowLeft className="mr-2 text-xl" />
            <span className="hidden sm:block">Back to Dashboard</span>
          </Link>
        </div>
        <h1 className="text-2xl font-semibold">Manage Services</h1>
        <button onClick={handleCreateService} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center">
          <FiPlus className="mr-2" />
          <span>Create Service</span>
        </button>
      </div>

      <div className="p-6">
        {isCreating || isEditing ? (
          <form onSubmit={handleSubmitService} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Service" : "Create New Service"}</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">Service Title</label>
              <input type="text" id="title" name="title" value={newService.title} onChange={handleInputChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea id="description" name="description" value={newService.description} onChange={handleInputChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">Service Image</label>
              <input type="file" id="image" name="image" onChange={handleImageChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">{isEditing ? "Update Service" : "Create Service"}</button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description?.substring(0, 100)}...</p>
                {service.imageUrl && <img src={`http://localhost:4040${service.imageUrl}`} alt={service.title} className="mt-4 w-full h-auto rounded-md" />}
                <div className="mt-4 flex space-x-2">
                  <button onClick={() => handleSelectService(service)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center">
                    <FiEye className="mr-1" />
                    <span>View</span>
                  </button>
                  <button onClick={() => handleEditService(service)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md flex items-center">
                    <FiEdit className="mr-1" />
                    <span>Edit</span>
                  </button>
                  <button onClick={() => handleDeleteService(service.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center">
                    <FiTrash2 className="mr-1" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{selectedService.title}</h2>
              <button onClick={handleCloseDetails} className="text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-4">{selectedService.description}</p>
            {selectedService.imageUrl && <img src={`http://localhost:4040${selectedService.imageUrl}`} alt={selectedService.title} className="w-full rounded-md" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicePage;
