import React, { useState, useEffect } from "react";
import { FaCreditCard, FaUsers, FaInfoCircle } from "react-icons/fa";
import { FiHome, FiCalendar, FiUsers, FiLogOut, FiMail } from "react-icons/fi";
import { MdMenu, MdClose } from "react-icons/md";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totals, setTotals] = useState({ members: 0, services: 0, contacts: 0, events: 0, debts: 0 });
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchTotals = async () => {
      setLoading(true);
      try {
        const endpoints = [
          "http://localhost:4040/members/count",
          "http://localhost:4040/service/count",
          "http://localhost:4040/contacts/count",
          "http://localhost:4040/events/count",
          "http://localhost:4040/debts/count",
        ];

        const responses = await Promise.all(endpoints.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.ok ? res.json() : { total: 0 }));

        setTotals({
          members: data[0]?.total || 0,
          services: data[1]?.total || 0,
          contacts: data[2]?.total || 0,
          events: data[3]?.total || 0,
          debts: data[4]?.total || 0,
        });
      } catch (error) {
        console.error("Error fetching totals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotals();
  }, []);

  const menuItems = [
    { href: "/admin/dashboard", icon: <FiHome />, label: "Dashboard" },
    { href: "/admin/event", icon: <FiCalendar />, label: "Events" },
    { href: "/admin/members", icon: <FiUsers />, label: "Members" },
    { href: "/admin/services", icon: <FiCalendar />, label: "Services" },
    { href: "/admin/contacts", icon: <FiMail />, label: "Contact" },
    { href: "/admin/debts", icon: <FaCreditCard />, label: "Debts" },
    { href: "/admin/about", icon: <FaInfoCircle />, label: "About" },
    { href: "/admin/one", icon: <FaUsers />, label: "Attendance" },
    { href: "/admin", icon: <FiLogOut />, label: "Logout" },
  ];

  const stats = [
    { title: "Total Members", count: totals.members, link: "/admin/members", color: "bg-green-500" },
    { title: "Total Services", count: totals.services, link: "/admin/services", color: "bg-purple-500" },
    { title: "Total Contacts", count: totals.contacts, link: "/admin/contacts", color: "bg-yellow-500" },
    { title: "Total Events", count: totals.events, link: "/admin/event", color: "bg-red-500" },
    { title: "Total Debts", count: totals.debts, link: "/admin/debts", color: "bg-gray-900" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}>
        <div className="p-6 flex items-center justify-between md:justify-center border-b border-blue-600">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-white text-2xl md:hidden"><MdClose /></button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.label}>
                <a href={item.href} className="flex items-center px-4 py-3 hover:bg-blue-600 rounded-lg transition-colors">
                  {item.icon} <span className="ml-4">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto">
        {/* Navbar */}
        <header className="bg-blue-800 text-white p-4 flex items-center justify-between md:justify-end fixed top-0 left-0 w-full shadow-md">
          <button onClick={toggleSidebar} className="text-white text-2xl md:hidden"><MdMenu /></button>
          <h1 className="hidden md:block text-2xl font-semibold">MUF</h1>
        </header>

        {/* Content */}
        <main className="pt-16 p-6">
          <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {stats.map(({ title, count, link, color }) => (
              <div key={title} className={`p-6 rounded-lg shadow-lg text-white ${color} flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out` }>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-4xl font-bold">{loading ? "Loading..." : count}</p>
                <p className="text-gray-200 mt-2">Manage all {title.toLowerCase()}.</p>
                <a href={link} className="mt-4 inline-block bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors shadow-md">View {title.split(" ")[1]}</a>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
