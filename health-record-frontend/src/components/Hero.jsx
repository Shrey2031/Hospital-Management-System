 import RoleCard from "../components/RoleCard";

 import React from 'react'
 
//  const Hero = () => {
//    return (
//      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//           <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Health Record Portal</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
//         <RoleCard
//           title="Patient"
//           description="Access and manage your personal health records easily and securely."
//           onClick={() => handleNavigation("user")}
//         />
//         <RoleCard
//           title="Doctor"
//           description="View your patients’ records and manage consultations efficiently."
//           onClick={() => handleNavigation("doctor")}
//         />
//         <RoleCard
//           title="Facility"
//           description="Maintain facility records, access patient history and share securely."
//           onClick={() => handleNavigation("facility")}
//         />
//       </div>
//      </div>
//    )
//  }
 
//  export default Hero

 

export default function HealthRecordHero() {
  return (
    <section className="bg-gradient-to-r from-sky-50 to-white min-h-[60vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center md:justify-between gap-12">
        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-sky-900 leading-tight mb-4">
            Simplify Your Health Record Management
          </h1>
          <p className="text-sky-700 text-lg md:text-xl">
            Secure, accessible, and organized digital health records at your fingertips, empowering you and your healthcare providers to deliver the best care.
          </p>
        </div>
        {/* Image */}
        <div className="max-w-lg w-full flex justify-center md:justify-end">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/468795f4-ee08-426a-b731-873a7ab955fd.png"
            alt="Professional doctor holding health records with warm and caring expression, wearing a white coat and stethoscope, clean blue gradient background"
            className="rounded-xl shadow-lg max-w-full h-auto object-cover"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cd217d0b-8e06-4630-8f56-9966b7ca1291.png'; }}
          />
        </div>
      </div>
    </section>
  );
}


 
 
