import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;



export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();
  

  useEffect(() => {
   const fetchUser = async () => {
   try {
  const res = await axios.get(`${BASE_URL}/user`, {
    withCredentials: true,
  })
   .then(res => {
        setUser(res.data.user);
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

  useEffect(() => {
  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/health/user`, 
        { withCredentials: true }
      );

      console.log("API DATA:", res.data); // DEBUG
      setRecords(res.data.data.records);
      

    } catch (err) {
      console.log(err);
    }
  };

  fetchRecords();
}, []);

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        
        `${BASE_URL}/appoinment/user`,
        { withCredentials: true }
      );
       console.log("Appointments DATA:", res.data.data); // DEBUG
      setAppointments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchAppointments();
}, []);

  
  // Sample user data
  const userData = {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1 (555) 123-4567',
    bloodGroup: 'A+',
    gender: 'Female',
    address: '123 Wellness St, Springfield, IL 62704',
    lastAppointment: '2023-06-15',
    nextAppointment: '2023-08-20',
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
    ],
    healthStats: {
      weight: '68kg',
      height: '165cm',
      bloodPressure: '120/80',
      cholesterol: '180 mg/dL'
    }
  };

  // Sample health records
  // const healthRecords = [
  //   { date: '2023-06-15', doctor: 'Dr. Smith', type: 'Checkup', notes: 'Routine annual checkup' },
  //   { date: '2023-04-10', doctor: 'Dr. Lee', type: 'Consultation', notes: 'Follow-up on medication' },
  //   { date: '2023-01-05', doctor: 'Dr. Patel', type: 'Lab Test', notes: 'Blood work results normal' }
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Health Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="material-icons text-blue-600">notifications</span>
            <div className="flex items-center">
              <img 
                // src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9703b60a-a81b-440e-b0c9-427387a93821.png" 
                src='https://tse4.mm.bing.net/th/id/OIP.9UChLYifGrntmmzueKA9rAHaHh?pid=Api&P=0&h=180'
                alt="User profile" 
                className="w-10 h-10 rounded-full border-2 border-sky-400"
              />
              <span className="ml-2 font-medium text-blue-900">{user?.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.username}!</h2>
          <p className="text-sky-100">Your health is our priority. Here's your personalized dashboard.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`${activeTab === 'records' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Health Records
            </button>
            <button
              onClick={() => setActiveTab('medications')}
              className={`${activeTab === 'medications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Medications
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`${activeTab === 'appointments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Appointments
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <span className="material-icons mr-2 text-blue-600">person</span>
                Personal Information
              </h3>
              <div className="space-y-3">
                <p><span className="font-medium text-blue-800">Name:</span> {user?.username}</p>
                <p><span className="font-medium text-blue-800">Email:</span> {user?.email}</p>
                <p><span className="font-medium text-blue-800">Phone:</span> {user?.phone}</p>
                <p><span className="font-medium text-blue-800">Gender:</span> {user?.gender}</p>
                <p><span className="font-medium text-blue-800">Blood Group:</span> {user?.bloodGroup}</p>
                <p><span className="font-medium text-blue-800">Address:</span> {user?.address}</p>
              </div>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                <span className="material-icons mr-1 text-sm">edit</span>
                Update Information
              </button>
            </div>

            {/* Health Stats Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <span className="material-icons mr-2 text-blue-600">monitor_heart</span>
                Health Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sky-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">Weight</p>
                  <p className="text-xl font-bold text-blue-900">{userData.healthStats.weight}</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">Height</p>
                  <p className="text-xl font-bold text-blue-900">{userData.healthStats.height}</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">Blood Pressure</p>
                  <p className="text-xl font-bold text-blue-900">{userData.healthStats.bloodPressure}</p>
                </div>
                <div className="bg-sky-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">Cholesterol</p>
                  <p className="text-xl font-bold text-blue-900">{userData.healthStats.cholesterol}</p>
                </div>
              </div>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                <span className="material-icons mr-1 text-sm">add</span>
                Add New Measurement
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <span className="material-icons mr-2 text-blue-600">event</span>
                Upcoming Appointments
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium text-blue-900">Next Appointment</p>
                  <p className="text-sm text-gray-600">{userData.nextAppointment}</p>
                </div>
                <div className="border-l-4 border-sky-400 pl-4 py-2">
                  <p className="font-medium text-blue-900">Last Visit</p>
                  <p className="text-sm text-gray-600">{userData.lastAppointment}</p>
                </div>
              </div>
    
              <button onClick={() => navigate("/appointment")}  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
                <span className="material-icons mr-1 text-sm">add</span>
                Schedule New Appointment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-blue-900">Health Records</h3>
              <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center">
                <span className="material-icons mr-1 text-sm">add</span>
                Add Record
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {Array.isArray(records) && records.map((record) => (
                <div key={record._id} className="px-6 py-4 hover:bg-sky-50 transition"> 
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-blue-900">{record.description} with {record.doctor?.fullname}</p>
                      <p className="text-sm text-gray-600">{new Date(record.createdAt).toDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <span className="material-icons">visibility</span>
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <span className="material-icons">download</span>
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{record.diagnosis}</p>
                </div>
               ))} 

            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-blue-900">Current Medications</h3>
              <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center">
                <span className="material-icons mr-1 text-sm">add</span>
                Add Medication
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {userData.medications.map((med, index) => (
                <div key={index} className="px-6 py-4 hover:bg-sky-50 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-blue-900">{med.name}</p>
                      <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <span className="material-icons">edit</span>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-blue-900">Upcoming Appointments</h3>
              <button  onClick={() => navigate('/appointment')} className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center">
                <span className="material-icons mr-1 text-sm">add</span>
                Book Appointment
              </button>
            </div>
            {/* <div className="p-6">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-blue-900">Annual Checkup</p>
                    <p className="text-sm text-gray-600">With Dr. Smith</p>
                    <p className="text-sm text-gray-600">August 20, 2023 • 10:00 AM</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <span className="material-icons">cancel</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 mb-4">
                <p className="font-medium text-blue-900">Dermatology Consultation</p>
                <p className="text-sm text-gray-600">With Dr. Lee</p>
                <p className="text-sm text-gray-600">September 5, 2023 • 2:30 PM</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium text-blue-900">Lab Tests</p>
                <p className="text-sm text-gray-600">Springfield Medical Labs</p>
                <p className="text-sm text-gray-600">September 12, 2023 • 8:00 AM</p>
              </div>
            </div> */}
            <div className="p-6">
      

        {Array.isArray(appointments) && appointments.map((appt) => (
         <div key={appt._id} className="bg-blue-50 rounded-lg p-4 mb-4">
           <div className="flex justify-between items-center">
           <div>
          <p className="font-medium text-blue-900">
            {appt.title || "Consultation"}
          </p>
          <p className="text-sm text-gray-600">
            With {appt.doctor?.Name}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(appt.createdAt).toLocaleDateString()}
          </p>
          </div>

           <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
            <span className="material-icons">edit</span>
            </button>
          <button className="text-blue-600 hover:text-blue-800">
            <span className="material-icons">cancel</span>
          </button>
           </div>
        </div>
      </div>
      ))}
     </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-tr from-sky-900 via-blue-900 to-blue-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© {new Date().getFullYear()} Health Record Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
