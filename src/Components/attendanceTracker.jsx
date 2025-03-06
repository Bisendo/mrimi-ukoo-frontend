import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Added for navigation

const Attendance = () => {
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // Fetch members when component mounts
  useEffect(() => {
    axios.get("http://localhost:4040/members")
      .then((response) => {
        setMembers(response.data);
        setAttendance(
          response.data.reduce((acc, member) => {
            acc[member.id] = false;
            return acc;
          }, {})
        );
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
      });
  }, []);

  const handleChange = (e, memberId) => {
    setAttendance({
      ...attendance,
      [memberId]: e.target.checked,
    });
  };

  const handleSubmit = () => {
    const date = new Date().toISOString().split("T")[0];
    
    const attendanceData = members.map((member) => ({
      memberId: member.id,
      present: attendance[member.id],
    }));

    axios.post("http://localhost:4040/attendances", { date, attendance: attendanceData })
      .then((response) => {
        alert("Attendance has been submitted successfully!");
      })
      .catch((err) => {
        console.error("Error submitting attendance:", err);
      });
  };

  const fetchAttendanceForDate = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    axios.get(`http://localhost:4040/attendances/${selectedDate}`)
      .then((response) => {
        setAttendanceRecords(response.data);
        
        const present = response.data.filter(record => record.present).length;
        const absent = response.data.filter(record => !record.present).length;

        setPresentCount(present);
        setAbsentCount(absent);
      })
      .catch((err) => {
        console.error("Error fetching attendance records:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-semibold">Attendance Management</h1>
      </div>

      <div className="p-6">
        {/* Button to go back to the dashboard */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate('/admin/dashboard')} // Navigate to dashboard
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {showForm ? "Cancel" : "Mark Attendance"}
          </button>
        </div>

        {/* Show Form if `showForm` is true */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700">Member Name</th>
                    <th className="px-6 py-3 text-left text-gray-700">Present</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-t transition duration-300 hover:bg-blue-100">
                      <td className="px-6 py-4 text-gray-800">{member.username}</td>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={attendance[member.id]}
                          onChange={(e) => handleChange(e, member.id)}
                          className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded transition duration-200 hover:bg-green-100"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-teal-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Submit Attendance
            </button>
          </div>
        )}

        {/* View Attendance Records */}
        <div className="mb-8 mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">View Attendance Records</h3>
          <div className="flex items-center mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchAttendanceForDate}
              className="ml-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200"
            >
              View Attendance
            </button>
          </div>

          {attendanceRecords.length > 0 && (
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Attendance for {selectedDate}</h4>
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600">Member Name</th>
                    <th className="px-6 py-3 text-left text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.memberId} className="border-t transition duration-200 hover:bg-blue-50">
                      <td className="px-6 py-4 text-gray-800">{record.member.username}</td>
                      <td className="px-6 py-4">
                        {record.present ? (
                          <FiCheckCircle className="text-green-600" />
                        ) : (
                          <FiXCircle className="text-red-600" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-center">
                <p><strong>Present Members: </strong>{presentCount}</p>
                <p><strong>Absent Members: </strong>{absentCount}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
