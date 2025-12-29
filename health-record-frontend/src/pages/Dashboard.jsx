import React, { useState } from 'react';

const PatientDashboard = () => {
  // Mock data (replace with API calls)
  const [profile] = useState({
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    contact: 'john.doe@email.com',
    lastVisit: '15 Dec 2024',
  });

  const [records, setRecords] = useState([
    { id: 1, visitDate: '12 Jan 2025', doctor: 'Dr. Sharma', facility: 'Apollo Hospital', diagnosis: 'Fever', document: 'fever_report.pdf' },
    { id: 2, visitDate: '05 Nov 2024', doctor: 'Dr. Patel', facility: 'City Clinic', diagnosis: 'Checkup', document: 'checkup_report.pdf' },
  ]);

  const [appointments] = useState([
    { date: '20 Jan 2025', doctor: 'Dr. Sharma', facility: 'Apollo Hospital' },
  ]);

  // State for sidebar (mobile toggle), modal, and sorting
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sortKey, setSortKey] = useState('visitDate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sort records
  const sortedRecords = [...records].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Handle sort
  const handleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  // Handle upload (placeholder)
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Uploaded: ${file.name}`); // Replace with actual upload logic
      // Example: Add to records list
      setRecords([...records, { id: records.length + 1, visitDate: new Date().toLocaleDateString(), doctor: 'Uploaded', facility: 'User', diagnosis: 'New Report', document: file.name }]);
    }
  };

  // Modal for viewing record
  const openModal = (record) => setSelectedRecord(record);
  const closeModal = () => setSelectedRecord(null);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-blue-500 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-blue-500 text-white">
          <h2 className="text-xl font-bold">Health Records</h2>
        </div>
        <nav className="mt-10">
          <a href="#" className="block py-2 px-4 text-blue-600 bg-blue-50 font-semibold">🏠 Dashboard</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:text-blue-600">📄 My Records</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:text-blue-600">👤 My Profile</a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:text-blue-600">🚪 Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-blue-200 md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-blue-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-blue-600">Patient Dashboard</h1>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
          <h1 className="text-2xl font-bold text-blue-600 mb-4 hidden md:block">Patient Dashboard</h1>
          <p className="text-gray-700 mb-6">Welcome back, {profile.name}!</p>

          {/* Profile Section */}
          <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Age:</strong> {profile.age} | <strong>Gender:</strong> {profile.gender}</p>
              <p><strong>Contact:</strong> {profile.contact}</p>
              <p><strong>Last Visit:</strong> {profile.lastVisit}</p>
            </div>
          </div>

          {/* My Health Records */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">My Health Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-blue-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-2 px-4 border-b cursor-pointer text-blue-600" onClick={() => handleSort('visitDate')}>Visit Date {sortKey === 'visitDate' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                    <th className="py-2 px-4 border-b cursor-pointer text-blue-600" onClick={() => handleSort('doctor')}>Doctor {sortKey === 'doctor' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                    <th className="py-2 px-4 border-b text-blue-600">Facility</th>
                    <th className="py-2 px-4 border-b text-blue-600">Diagnosis</th>
                    <th className="py-2 px-4 border-b text-blue-600">Document</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-blue-50">
                      <td className="py-2 px-4 border-b">{record.visitDate}</td>
                      <td className="py-2 px-4 border-b">{record.doctor}</td>
                      <td className="py-2 px-4 border-b">{record.facility}</td>
                      <td className="py-2 px-4 border-b">{record.diagnosis}</td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => openModal(record)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">View</button>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Reports */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Upload Reports</h2>
            <input type="file" onChange={handleUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          </div>

          {/* Appointments */}
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Appointments</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">Book New Appointment</button>
            <ul>
              {appointments.map((appt, index) => (
                <li key={index} className="mb-2">{appt.date} - {appt.doctor} at {appt.facility}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>

      {/* Modal for Record Details */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Record Details</h3>
            <p><strong>Visit Date:</strong> {selectedRecord.visitDate}</p>
            <p><strong>Doctor:</strong> {selectedRecord.doctor}</p>
            <p><strong>Facility:</strong> {selectedRecord.facility}</p>
            <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
            <p><strong>Document:</strong> {selectedRecord.document}</p>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
