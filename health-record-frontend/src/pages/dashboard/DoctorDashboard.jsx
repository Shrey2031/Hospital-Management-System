import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const profile = {
    name: "Dr. John Smith",
    specialization: "Cardiology",
    experience: "15 years",
    facility: "City Health Clinic",
    email: "john.smith@example.com",
    contact: "+1 (555) 987-6543",
  };

  const healthStats = {
    patientsToday: 12,
    recordsCreated: 36,
    pendingAppointments: 5,
    prescriptionsIssued: 20,
  };

  const upcomingAppointments = {
    nextAppointment: "2024-08-20",
    lastVisit: "2024-06-15",
  };

  const tabs = ["Overview", "Patient Records", "Prescriptions", "Appointments"];

    useEffect(() => {
   const fetchUser = async () => {
   try {
  const res = await axios.get("http://localhost:3000/api/v1/doctor/", {
    withCredentials: true,
  })
   .then(res => {
       console.log(res.data.doctor);
        setDoctor(res.data.doctor);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  } catch (err) {
  setError("Authentication failed. Please login again.");
  } finally {
  setLoading(false);
  }
  };
  fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-8 py-4 bg-white shadow-md">
        <h1 className="text-xl md:text-2xl font-bold text-blue-900">Health Dashboard</h1>
        <div className="flex items-center space-x-4 md:space-x-6">
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Notifications</a>
          <div className="flex items-center space-x-3 cursor-pointer">
            <img
              src="https://i.pravatar.cc/38"
              alt={doctor?.fullname}
              className="w-10 h-10 rounded-full border-2 border-blue-600"
            />
            <span className="text-blue-900 font-semibold hidden md:block">{doctor?.fullname}</span>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="px-6 md:px-8 py-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg text-white max-w-6xl mx-auto p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {doctor?.fullname}!
          </h2>
          <p className="text-lg">Your health is our priority. Here's your personalized dashboard.</p>
        </div>
      </section>

      {/* Tabs */}
      <nav className="max-w-6xl mx-auto px-6 md:px-8 flex space-x-6 md:space-x-8 border-b border-gray-300 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm md:text-base font-semibold transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content Cards */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 mb-16">
        {/* Personal Information */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-blue-600 font-bold flex items-center mb-4 space-x-2">
            <span className="text-blue-600 text-xl">👤</span>
            <span>Personal Information</span>
          </h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {doctor?.fullname}</p>
            <p><strong>Email:</strong> {doctor?.email}</p>
            <p><strong>Phone:</strong> {doctor?.phone}</p>
            <p><strong>Specialization:</strong> {doctor?.specialization}</p>
            <p><strong>Experience:</strong> {doctor?.experienceInyears}</p>
            <p><strong>Facility:</strong> {profile?. workInHospital}</p>
          </div>
          <a href="#" className="mt-4 inline-block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            Edit Update Information
          </a>
        </div>

        {/* Health Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-blue-600 font-bold flex items-center mb-6 space-x-2">
            <span className="text-blue-600 text-xl">❤️</span>
            <span>Health Statistics</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-1">Patients Today</div>
              <div className="text-xl font-bold text-blue-700">{healthStats.patientsToday}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-1">Records Created</div>
              <div className="text-xl font-bold text-blue-700">{healthStats.recordsCreated}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-1">Pending Appointments</div>
              <div className="text-xl font-bold text-blue-700">{healthStats.pendingAppointments}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-gray-600 text-sm mb-1">Prescriptions Issued</div>
              <div className="text-xl font-bold text-blue-700">{healthStats.prescriptionsIssued}</div>
            </div>
          </div>
          <a href="#" className="mt-4 block text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            Add Add New Measurement
          </a>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-blue-600 font-bold flex items-center mb-6 space-x-2">
            <span className="text-blue-600 text-xl">📅</span>
            <span>Upcoming Appointments</span>
          </h3>
          <div className="space-y-4">
            <div>
              <strong className="text-gray-700">Next Appointment</strong>
              <div className="text-blue-700 font-semibold">{upcomingAppointments.nextAppointment}</div>
            </div>
            <div>
              <strong className="text-gray-700">Last Visit</strong>
              <div className="text-blue-700 font-semibold">{upcomingAppointments.lastVisit}</div>
            </div>
          </div>
          <button  onClick={() => Navigate("/appointment")} className="w-full bg-blue-600 text-white rounded-lg py-3 mt-6 hover:bg-blue-700 transition-colors font-semibold">
            Schedule New Appointment
          </button>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;