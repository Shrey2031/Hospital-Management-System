 import RoleCard from "../components/RoleCard";

 import React from 'react'
 
 const Hero = () => {
   return (
     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Health Record Portal</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <RoleCard
          title="Patient"
          description="Access and manage your personal health records easily and securely."
          onClick={() => handleNavigation("user")}
        />
        <RoleCard
          title="Doctor"
          description="View your patients’ records and manage consultations efficiently."
          onClick={() => handleNavigation("doctor")}
        />
        <RoleCard
          title="Facility"
          description="Maintain facility records, access patient history and share securely."
          onClick={() => handleNavigation("facility")}
        />
      </div>
     </div>
   )
 }
 
 export default Hero
 
 
