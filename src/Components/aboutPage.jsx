import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const FamilyLeaderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: null,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.description) {
      alert("Please fill all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4040/leaders", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Leader added successfully!");
        setLeaders([...leaders, response.data]); // Add new leader to the list
        setFormData({ name: "", role: "", image: null, description: "" });

        // Navigate to About page after successful leader addition
        navigate("/about"); // Assuming your About page is at "/about"
      } else {
        throw new Error(`Failed with status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding leader:", error.response || error.message);
      alert(`Failed to add leader. ${error.response ? error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Family Leader</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Leader's Name"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Leader's Role"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Short Description"
        className="w-full p-2 border rounded mb-2"
        required
      ></textarea>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      <div>
        <h3>Leaders List</h3>
        <ul>
          {leaders.map((leader) => (
            <li key={leader.id}>{leader.name} - {leader.role}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default FamilyLeaderForm;
