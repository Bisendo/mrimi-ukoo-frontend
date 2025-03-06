import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navibar";

const Debts = () => {
  const [membersDebts, setMembersDebts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  // Function to fetch debts from the backend
  const fetchDebts = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get("http://localhost:4040/debts");
      setMembersDebts(response.data);
    } catch (error) {
      console.error("Error fetching debts:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch debts initially and every 5 seconds for real-time updates
  useEffect(() => {
    fetchDebts(); // Initial fetch

    const interval = setInterval(() => {
      fetchDebts();
    }, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Filter debts based on search term
  const filteredDebts = membersDebts.filter((debt) =>
    debt.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    debt.debtStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="pt-20 max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Group Member Debts</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="Search by username or debt status..."
            className="w-full border-none focus:outline-none p-2 text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchDebts}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Refresh Now
        </button>

        {/* Loading Indicator */}
        {loading && <p className="text-gray-600 text-center">Refreshing...</p>}

        {/* Debts Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="text-left py-3 px-4 border-b">ID</th>
                <th className="text-left py-3 px-4 border-b">Username</th>
                <th className="text-left py-3 px-4 border-b">Total Debt</th>
                <th className="text-left py-3 px-4 border-b">Amount Paid</th>
                <th className="text-left py-3 px-4 border-b">Amount Owed</th>
                <th className="text-left py-3 px-4 border-b">Debt Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDebts.length > 0 ? (
                filteredDebts.map((debt) => (
                  <tr key={debt.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-gray-800">{debt.id}</td>
                    <td className="py-3 px-4 border-b text-gray-800">{debt.username}</td>
                    <td className="py-3 px-4 border-b text-gray-600">{debt.totalDebt} USD</td>
                    <td className="py-3 px-4 border-b text-gray-600">{debt.amountPaid} USD</td>
                    <td className="py-3 px-4 border-b text-gray-600">{debt.amountOwed} USD</td>
                    <td
                      className={`py-3 px-4 border-b font-semibold ${
                        debt.debtStatus === "Completed" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {debt.debtStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3 px-4 text-gray-500">
                    No debts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Debts;
