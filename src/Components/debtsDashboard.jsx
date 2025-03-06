import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCreditCard } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";

const AdminDebts = () => {
  const [membersDebts, setMembersDebts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDebt, setEditingDebt] = useState(null);
  const [newDebt, setNewDebt] = useState({
    username: "",
    totalDebt: "",
    amountPaid: "",
    debtStatus: "Pending",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch debts from API
  useEffect(() => {
    const fetchDebts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4040/debts");
        setMembersDebts(data);
      } catch (error) {
        console.error("Error fetching debts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDebts();
  }, []);

  // Handle input changes for both adding and editing debt
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedDebt = editingDebt ? editingDebt : newDebt;

    if (name === "totalDebt" || name === "amountPaid") {
      const amountOwed =
        updatedDebt.totalDebt && updatedDebt.amountPaid
          ? updatedDebt.totalDebt - updatedDebt.amountPaid
          : 0;
      setEditingDebt ? setEditingDebt({ ...updatedDebt, amountOwed }) : setNewDebt({ ...updatedDebt, amountOwed });
    } else {
      setEditingDebt ? setEditingDebt({ ...updatedDebt, [name]: value }) : setNewDebt({ ...updatedDebt, [name]: value });
    }
  };

  // Add new debt
  const handleAddDebt = async (e) => {
    e.preventDefault();
    const amountOwed = newDebt.totalDebt - newDebt.amountPaid;
    try {
      const response = await axios.post("http://localhost:4040/debts", {
        ...newDebt,
        amountOwed,
      });
      setMembersDebts([...membersDebts, response.data]);
      setNewDebt({ username: "", totalDebt: "", amountPaid: "", debtStatus: "Pending" });
    } catch (error) {
      console.error("Error adding debt:", error);
    }
  };

  // Edit existing debt
  const handleEditDebtSubmit = async (e) => {
    e.preventDefault();
    const updatedAmountOwed = editingDebt.totalDebt - editingDebt.amountPaid;
    try {
      await axios.patch(`http://localhost:4040/debts/${editingDebt.id}`, {
        ...editingDebt,
        amountOwed: updatedAmountOwed,
      });
      setMembersDebts((prevDebts) =>
        prevDebts.map((debt) =>
          debt.id === editingDebt.id ? { ...debt, ...editingDebt, amountOwed: updatedAmountOwed } : debt
        )
      );
      setEditingDebt(null);
    } catch (error) {
      console.error("Error editing debt:", error);
    }
  };

  // Mark debt as completed
  const handleMarkCompleted = async (id) => {
    const debt = membersDebts.find((debt) => debt.id === id);
    if (!debt || debt.amountOwed !== 0) {
      alert("Debt must be fully paid before marking as completed.");
      return;
    }

    try {
      await axios.patch(`http://localhost:4040/debts/${id}`, { debtStatus: "Completed" });
      setMembersDebts((prevDebts) =>
        prevDebts.map((debt) =>
          debt.id === id ? { ...debt, debtStatus: "Completed" } : debt
        )
      );
    } catch (error) {
      console.error("Error updating debt status:", error);
    }
  };

  // Filter debts based on search term
  const filteredDebts = membersDebts.filter(
    (debt) =>
      debt.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.debtStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-800 text-white w-64 z-50 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-lg`}
      >
        <div className="p-6 flex items-center justify-between md:justify-center border-b border-blue-600">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl md:hidden"
          >
            <MdClose />
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li><a href="/admin/dashboard" className="flex items-center px-4 py-3 hover:bg-blue-600 rounded-lg transition-colors"><MdMenu /><span className="ml-4">Dashboard</span></a></li>
            <li><a href="/admin/debts" className="flex items-center px-4 py-3 hover:bg-blue-600 rounded-lg transition-colors"><FaCreditCard /><span className="ml-4">Debts</span></a></li>
            <li><a href="/admin" className="flex items-center px-4 py-3 hover:bg-blue-600 rounded-lg transition-colors"><MdClose /><span className="ml-4">Logout</span></a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto md:overflow-y-hidden">
        <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4 flex items-center justify-between md:justify-end fixed top-0 left-0 w-full z-40 shadow-md">
          <button onClick={toggleSidebar} className="text-white text-2xl md:hidden">
            <MdMenu />
          </button>
          <h1 className="hidden md:block text-2xl font-semibold">Admin Panel</h1>
        </header>

        <main className="pt-16 p-6 h-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Debt Management</h1>

          {/* Toggle Button */}
          <div className="mb-4 bg-gradient-to-b from-gray-100 to-white p-8 rounded">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`py-2 px-4 rounded-md mr-2 transition-all ${showForm ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}`}
            >
              {showForm ? "Hide Form" : "Show Form"}
            </button>
            <button
              onClick={() => setShowTable(!showTable)}
              className={`py-2 px-4 rounded-md transition-all ${showTable ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}`}
            >
              {showTable ? "Hide Table" : "Show Table"}
            </button>
          </div>

          {/* Add/Edit Debt Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {editingDebt ? "Edit Debt" : "Add New Debt"}
              </h2>
              <form onSubmit={editingDebt ? handleEditDebtSubmit : handleAddDebt} className="space-y-4">
                {/* Form Fields */}
                {["username", "totalDebt", "amountPaid"].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700">{field}</label>
                    <input
                      type={field.includes("Debt") ? "number" : "text"}
                      name={field}
                      value={editingDebt ? editingDebt[field] : newDebt[field]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-700">Amount Owed (USD)</label>
                  <input
                    type="number"
                    name="amountOwed"
                    value={editingDebt ? editingDebt.amountOwed : newDebt.amountOwed}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Debt Status</label>
                  <select
                    name="debtStatus"
                    value={editingDebt ? editingDebt.debtStatus : newDebt.debtStatus}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                  {editingDebt ? "Save Changes" : "Add Debt"}
                </button>
              </form>
            </div>
          )}

          {/* Debts Table */}
          {showTable && (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <div className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by username or status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="text-left py-3 px-4 border-b">ID</th>
                    <th className="text-left py-3 px-4 border-b">Username</th>
                    <th className="text-left py-3 px-4 border-b">Total Debt</th>
                    <th className="text-left py-3 px-4 border-b">Amount Paid</th>
                    <th className="text-left py-3 px-4 border-b">Amount Owed</th>
                    <th className="text-left py-3 px-4 border-b">Debt Status</th>
                    <th className="text-left py-3 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-3 text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredDebts.length > 0 ? (
                    filteredDebts.map((debt) => (
                      <tr key={debt.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b text-gray-800">{debt.id}</td>
                        <td className="py-3 px-4 border-b text-gray-800">{debt.username}</td>
                        <td className="py-3 px-4 border-b text-gray-600">{debt.totalDebt} USD</td>
                        <td className="py-3 px-4 border-b text-gray-600">{debt.amountPaid} USD</td>
                        <td className="py-3 px-4 border-b text-gray-600">{debt.amountOwed} USD</td>
                        <td className={`py-3 px-4 border-b font-semibold ${debt.debtStatus === "Completed" ? "text-green-600" : "text-red-600"}`}>
                          {debt.debtStatus}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {debt.debtStatus === "Pending" && (
                            <div className="flex space-x-2">
                              <button onClick={() => handleMarkCompleted(debt.id)} className="bg-green-600 text-white py-1 px-3 rounded-md">
                                Mark as Completed
                              </button>
                              <button onClick={() => setEditingDebt(debt)} className="bg-yellow-600 text-white py-1 px-3 rounded-md">
                                Edit
                              </button>
                            </div>
                          )}
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
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDebts;
