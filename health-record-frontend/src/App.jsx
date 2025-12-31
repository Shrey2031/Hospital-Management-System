import { useState,useContext,useEffect } from 'react'
import React from 'react';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPages from './pages/LandingPages'

import UserDashboard from './pages/dashboard/UserDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import FacilityDashboard from './pages/dashboard/FacilityDashboard';

import Appointment from './pages/auth/Appointment';
import RoleSelectionLogin from './pages/auth/RoleselectionLogin';
import RoleSelectionSignup from './pages/auth/RoleselecionSignup';
import UserLogin from './pages/auth/Login/UserLogin'
import DoctorLogin from './pages/auth/Login/DoctorLogin'
import FacilityLogin from './pages/auth/Login/FacilityLogin'

import UserRegister from './pages/auth/Register/userRegister1'
import DoctorRegister from './pages/auth/Register/DoctorRegister'
import FacilityRegister from './pages/auth/Register/FacilityRegister'
import { Context } from './context/Context';


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);


return (
    <>

  
       <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPages />} />
        <Route path="/dashboard" element={<UserDashboard/>} />


            {/* dashboard  */}
        <Route path="/userdashboard" element={<UserDashboard/>} />
        
        <Route path="/doctordashboard" element={<DoctorDashboard/>} />
        <Route path="/facilitydashboard" element={<FacilityDashboard/>} />



        {/* roleselection  */}
        <Route path="/login" element={<RoleSelectionLogin />} />
        <Route path="/signup" element={<RoleSelectionSignup />} />


        {/* login routes */}
        
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/doctor" element={<DoctorLogin />} />
        <Route path="/login/facility" element={<FacilityLogin />} />

        {/* Register Routes  */}
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/facility" element={<FacilityRegister />} />

       {/* appointment routes */}
        <Route path="/appointment" element={<Appointment />} />

        
      </Routes>
      <ToastContainer/>
     </BrowserRouter>  
    </>
  )
}

export default App
