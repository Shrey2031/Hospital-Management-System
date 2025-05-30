import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPages from './pages/LandingPages'

import RoleSelectionLogin from './pages/Auth/RoleselectionLogin';
import RoleSelectionSignup from './pages/Auth/RoleselecionSignup';
import UserLogin from './pages/auth/Login/UserLogin'
import DoctorLogin from './pages/auth/Login/DoctorLogin'
import FacilityLogin from './pages/auth/Login/FacilityLogin'

import UserRegister from './pages/auth/Register/UserRegister'
import DoctorRegister from './pages/auth/Register/DoctorRegister'
import FacilityRegister from './pages/auth/Register/FacilityRegister'







function App() {
  

  return (
    <>
!
  
       <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPages />} />


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


        
      </Routes>
     </BrowserRouter>  
    </>
  )
}

export default App
