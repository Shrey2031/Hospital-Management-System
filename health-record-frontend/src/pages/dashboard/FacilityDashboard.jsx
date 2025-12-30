import React, { useState } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const FacilityDashboard = () => {
  const [profile] = useState({
    name: "City Health Clinic",
    address: "456 Wellness Blvd, Springfield, IL",
    email: "contact@cityhealthclinic.com",
    contact: "+1 (555) 789-1234",
  });

  const [records] = useState([
    {
      id: 1,
      patient: "Alice Johnson",
      doctor: "Dr. John Smith",
      diagnosis: "Flu",
      date: "2024-01-15",
      document: "flu_report.pdf",
    },
    {
      id: 2,
      patient: "Bob Williams",
      doctor: "Dr. Jane Doe",
      diagnosis: "Checkup",
      date: "2024-01-12",
      document: "checkup_report.pdf",
    },
  ]);

  const [doctors] = useState([
    { id: 1, name: "Dr. Smith", specialization: "Cardiology" },
    { id: 2, name: "Dr. Doe", specialization: "General Medicine" },
  ]);

  const [patients] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      doctor: "Dr. Smith",
      diagnosis: "Flu",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob Williams",
      doctor: "Dr. Doe",
      diagnosis: "Checkup",
      date: "2024-01-12",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Facility Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="text-blue-600 hover:text-blue-800">notifications</button>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="Facility Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-600"
            />
            <span className="text-blue-900 font-semibold">{profile.name} Admin</span>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-1">Welcome back, {profile.name} Admin!</h2>
        <p>Manage records, doctors, and patient visits in your facility.</p>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex space-x-8 border-b border-gray-300 mb-8 text-blue-700 font-medium">
        <button className="pb-3 border-b-4 border-blue-600">Overview</button>
        <button className="pb-3 hover:text-blue-900">Health Records</button>
        <button className="pb-3 hover:text-blue-900">Doctors</button>
        <button className="pb-3 hover:text-blue-900">Patients</button>
        <button className="pb-3 hover:text-blue-900">Facility Profile</button>
      </nav>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facility Profile */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4 space-x-3 text-blue-700 font-semibold text-xl">
            <span className="material-icons">apartment</span>
            <h3>Facility Profile</h3>
          </div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <button className="text-blue-600 mt-3 hover:underline">edit Update Facility Info</button>
        </div>

        {/* Records Made in Facility */}
        <div className="bg-white rounded-xl shadow p-6 overflow-auto max-h-[400px]">
          <div className="flex items-center mb-4 space-x-3 text-blue-700 font-semibold text-xl">
            <span className="material-icons">description</span>
            <h3>Records Made in This Facility</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="pb-2">Patient</th>
                <th className="pb-2">Doctor</th>
                <th className="pb-2">Diagnosis</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Document</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-blue-50">
                  <td className="py-2">{r.patient}</td>
                  <td className="py-2">{r.doctor}</td>
                  <td className="py-2">{r.diagnosis}</td>
                  <td className="py-2">{r.date}</td>
                  <td className="py-2">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Doctor List & Patient Visit History Combined */}
        <div className="space-y-6">
          {/* Doctor List */}
          <div className="bg-white rounded-xl shadow p-6 max-h-[190px] overflow-auto">
            <div className="flex items-center mb-4 space-x-3 text-blue-700 font-semibold text-xl">
              <span className="material-icons">medical_services</span>
              <h3>Doctor List</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-800">
              {doctors.map((doc) => (
                <li key={doc.id}>
                  <strong>{doc.name}</strong> - {doc.specialization}
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Visit History */}
          <div className="bg-white rounded-xl shadow p-6 max-h-[190px] overflow-auto">
            <div className="flex items-center mb-4 space-x-3 text-blue-700 font-semibold text-xl">
              <span className="material-icons">history</span>
              <h3>Patient Visit History</h3>
            </div>
            <table className="w-full text-left border-collapse text-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="pb-1">Patient</th>
                  <th className="pb-1">Doctor</th>
                  <th className="pb-1">Diagnosis</th>
                  <th className="pb-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50">
                    <td className="py-1">{p.name}</td>
                    <td className="py-1">{p.doctor}</td>
                    <td className="py-1">{p.diagnosis}</td>
                    <td className="py-1">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDashboard;