// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DoctorRegister= () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     specialization: "",
//     licenseNumber: "",
//     phone: "",
//     address: ""
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/register/doctor", formData);
//       alert("Doctor registered successfully");
//       navigate("/");
//     } catch (err) {
//       alert("Error: " + err?.response?.data?.message);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Doctor Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} />
//         <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} />
//         <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
//         <input type="text" name="address" placeholder="Address" onChange={handleChange} />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default DoctorRegister;

import React, { useState } from 'react';

export default function DoctorRegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    fullname:'',
    email: '',
    password: '',
    specialization: '',
    experienceInYears: '',
    avatar: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData((prev) => ({
        ...prev,
        avatar: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
    alert('Doctor registration successful! Your profile is created.');
    setFormData({
      username: '',
      fullname:'',
      email: '',
      password: '',
      specialization: '',
      experienceInYears: '',
      avatar: null,
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-blue-100 to-white flex items-center justify-center p-8">
      <section
        aria-labelledby="form-title"
        className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg max-w-3xl w-full p-10"
      >
        <h1
          id="form-title"
          className="text-3xl font-extrabold text-blue-800 text-center mb-4"
        >
          Doctor Registration
        </h1>
        <p className="text-center text-blue-700 mb-10 font-medium">
          Create your profile to join our health management system.
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Username */}
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-blue-900 font-semibold mb-1"
            >
              Username
            </label>
           
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="dr.johnsmith"
              autoComplete="username"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          {/* fullname */}
          <div className="relative">
            <label
              htmlFor="fullname"
              className="block text-blue-900 font-semibold mb-1"
            >
              Fullname
            </label>
            
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.fullname}
              onChange={handleChange}
              placeholder="dr.johnsmith"
              autoComplete="username"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-blue-900 font-semibold mb-1"
            >
              Email Address
            </label>
           
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              autoComplete="email"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-blue-900 font-semibold mb-1"
            >
              Password
            </label>
        
            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              autoComplete="new-password"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Specialization */}
          <div className="relative">
            <label
              htmlFor="specialization"
              className="block text-blue-900 font-semibold mb-1"
            >
              Specialization
            </label>
        
            <input
              id="specialization"
              name="specialization"
              type="text"
              required
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Cardiology, Neurology, etc."
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Experience in Years */}
          <div className="relative">
            <label
              htmlFor="experienceInYears"
              className="block text-blue-900 font-semibold mb-1"
            >
              Experience (Years)
            </label>
         
            <input
              id="experienceInYears"
              name="experienceInYears"
              type="number"
              min="0"
              max="60"
              required
              value={formData.experienceInYears}
              onChange={handleChange}
              placeholder="5"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Avatar upload - spans two columns */}
          <div className="relative md:col-span-2">
            <label
              htmlFor="avatar"
              className="block text-blue-900 font-semibold mb-1"
            >
              Profile Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="pt-2 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              aria-describedby="avatarHelp"
            />
            <p id="avatarHelp" className="text-sm text-blue-700 mt-1">
              Upload your profile image (optional).
            </p>
          </div>

          {/* Submit Button - spans two columns */}
          <button
            type="submit"
            aria-label="Register doctor account"
            className="md:col-span-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors text-white font-extrabold text-lg py-4 rounded-2xl shadow-md shadow-sky-400/50 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}


