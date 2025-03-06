import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navibar';
import Home from './pages/Home';
import About from './pages/About';
import EventsPage from './pages/EventsPage';
import ServicesPage from './pages/ServicesPage';
import AdminMemberPage from './Components/Members';
import MemberRegistration from './pages/MemberRegistration';
import LoginPage from './pages/MemberLogin';
import Contact from './pages/Contact';
import Debts from './pages/memberDebts';
import Giving from './pages/Giving';
import Dashboard from './Components/AdminDashboard';
import AttendanceTracker from './Components/attendanceTracker';
import AdminDebts from './Components/debtsDashboard';
import AdminLogin from './Components/AdminLogin';
import AdminEventPage from './Components/AdminEventPage';
import FamilyLeaderForm from './Components/aboutPage';
import ContactAdmin from './Components/ContactAdmin';
import AdminService from './Components/ServiceAdmin';
import MemberList from './pages/Members';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100"> {/* Background color for full screen */}
        {/* <Navbar /> */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/registrations" element={<MemberRegistration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Giving" element={<Giving />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/one" element={<AttendanceTracker/>} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/event" element={<AdminEventPage />} />
            <Route path="/admin/members" element={<AdminMemberPage />} />
            <Route path="/admin/about" element={<FamilyLeaderForm/>} />
            <Route path="/admin/debts" element={<AdminDebts />} />
            <Route path="/admin/contacts" element = {<ContactAdmin/>}/>            
            <Route path="/admin/services" element = {<AdminService/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
