import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export default function DoctorRegistrationForm() {
  const navigateTo = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experienceInYears, setExperienceInYears] = useState('');
  const [avatar, setAvatar] = useState('');
  
  

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     
    try {
        const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("password", password); 
      
      formData.append("specialization", specialization);
      formData.append("experienceInYears", experienceInYears);
      formData.append("gender", gender);
      formData.append("avatar", avatar);
  
     await axios.post("http://localhost:3000/api/v1/register/doctor", formData, {
       withCredentials: true,
       headers:{"Content-Type":"multipart/form-data"}
     })
     .then((res) => {
        navigateTo("/doctordashboard");
        setFullname('');
        setEmail('');
        setPassword('');
         setGender('');
        setSpecialization('');
        setExperienceInYears('');
        setAvatar('');   
     });
    } catch (error) {
      console.error("Registration error:", error);
    }

    
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
      

          {/* fullname */}
          <div className="relative">
            <label
              htmlFor="fullname"
              className="block text-blue-900 font-semibold mb-1"
            >
              Fullname
            </label>
            
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="dr.johnsmith"
              autoComplete="fullname"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              autoComplete="new-password"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

              {/* Gender (span two columns) md:col-span-2 */}
          <fieldset
            className="relative"
            aria-label="Gender"
            role="radiogroup"
          >
            <legend className="font-semibold text-blue-900 mb-1">Gender</legend>
            <div className="flex gap-8">
              <label className="flex items-center cursor-pointer select-none text-blue-900 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  required
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-sky-500 mr-2 w-5 h-5"
                />
                Male
              </label>
              <label className="flex items-center cursor-pointer select-none text-blue-900 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-sky-500 mr-2 w-5 h-5"
                />
                Female
              </label>
              <label className="flex items-center cursor-pointer select-none text-blue-900 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={gender === 'Other'}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-sky-500 mr-2 w-5 h-5"
                />
                Other
              </label>
            </div>
          </fieldset>

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
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
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
              value={experienceInYears}
              onChange={(e) => setExperienceInYears(e.target.value)}
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
              accept="image/*,application/pdf"
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


