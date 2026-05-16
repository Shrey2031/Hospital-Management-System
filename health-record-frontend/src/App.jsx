import { useState,useContext,useEffect } from 'react'
import React from 'react';
import { ToastContainer} from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route,Navigate  } from "react-router-dom"
// import Home from './pages/Home/Home';
import Home from './pages/Home/Home1';

import AuthPage from './components/Auth/Auth1';
import { AuthProvider } from './context/AuthContext';
// import PatientDashboard from './components/Dashboard/PatientDashboard'
// import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import Appointments from './components/Sidebar/Appointment';
import FacilityDashboard from './components/Dashboard/FacilityDashboard';
import DoctorDashboard from './components/Dashboard/Doctor1Dashboard';
// import MedicalRecords from './pages/Sidebar/MedicalRecord';
import MedicalRecords from './components/Sidebar/Myrecords';
// import Messages from './pages/Sidebar/Message';
import PatientDoctors from './pages/Sidebar/PatientDoctors';
// import PatientPrescriptions from './pages/Sidebar/Prescription';
import Prescriptions from './components/Sidebar/Prescription';
import PatientAppointments from './pages/Sidebar/Appointments';
import PatientDashboard from './components/Dashboard/Patient1Dashboard';
import MessagesPage from './components/Sidebar/Message';
import SettingsPage from './components/Sidebar/Setting';
const queryClient = new QueryClient();

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  


return (
    <>

      <QueryClientProvider client={queryClient}>
      <Router>  {/* ✅ Router FIRST */}
        <AuthProvider>  {/* ✅ AuthProvider SECOND (INSIDE Router) */}
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Auth" element={<AuthPage />} />
              {/* <Route path="/patient-dashboard" element={<PatientDashboard/>} /> */}
              <Route path="/records" element={<MedicalRecords />} />
              <Route path="/messages" element={<MessagesPage />} />
              {/* <Route path="/my-doctors" element={<PatientDoctors />} /> */}
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/settings" element={<SettingsPage />} />

              
            {/* 🔥 PATIENT ROUTES */}
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['PATIENT', 'patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            
           

            {/* 🔥 DOCTOR ROUTES */}
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['DOCTOR', 'doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
         

            {/* 🔥 FACILITY ROUTES */}
            <Route 
              path="/facility-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['FACILITY', 'facility']}>
                  <FacilityDashboard />
                </ProtectedRoute>
              } 
            />




              {/* <Route path="/patient-dashboard" element={<DoctorDashboard/>} /> */}
              {/* <Route path="/patient-dashboard" element={<FacilityDashboard/>} /> */}

            </Routes>
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </Router>  {/* ✅ Router WRAPS AuthProvider */}
     </QueryClientProvider>
    </>
  )
}

export default App
