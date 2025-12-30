import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export default function FacilityRegistrationForm() {
   const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [specialisedIn, setSpecialisedIn] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${BASE_URL}/register/facility`, 
        
        {fullname, email, password, address, city, specialisedIn, phone},
        { withCredentials: true,
          headers: { 'Content-Type': 'application/json' } ,
         }
      )
      .then((res) => {
        navigate('/facilitydashboard');
        setFullname('');
        setEmail('');
        setPassword('');
        setAddress('');
        setCity('');
        setSpecialisedIn('');
        setPhone('');   
     
      });
    } catch (error) {
      console.error('Registration error:', error);
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
          Facility Registration
        </h1>
        <p className="text-center text-blue-700 mb-10 font-medium">
          Create your facility profile to join our healthcare network.
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-blue-900 font-semibold mb-1"
            >
              Facility Name
            </label>
        
            <input
              id="name"
              name="name"
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="HealthCare Center"
              autoComplete="organization"
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
              placeholder="contact@healthcare.com"
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

          {/* Address */}
          <div className="relative">
            <label
              htmlFor="address"
              className="block text-blue-900 font-semibold mb-1"
            >
              Address
            </label>
            
            <input
              id="address"
              name="address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Wellness St."
              autoComplete="street-address"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* City */}
          <div className="relative">
            <label
              htmlFor="city"
              className="block text-blue-900 font-semibold mb-1"
            >
              City
            </label>
        
            <input
              id="city"
              name="city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Springfield"
              autoComplete="address-level2"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Specialised In */}
          <div className="relative">
            <label
              htmlFor="specialisedIn"
              className="block text-blue-900 font-semibold mb-1"
            >
              Specialised In
            </label>
           
            <input
              id="specialisedIn"
              name="specialisedIn"
              type="text"
              required
              value={specialisedIn}
              onChange={(e) => setSpecialisedIn(e.target.value)}
              placeholder="Cardiology, Pediatrics, etc."
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <label
              htmlFor="phone"
              className="block text-blue-900 font-semibold mb-1"
            >
              Phone Number
            </label>
           
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="^\+?[0-9\s\-]{7,15}$"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1-234-567-8901"
              autoComplete="tel"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Submit Button - spans two columns */}
          <button
            type="submit"
            aria-label="Register facility account"
            className="md:col-span-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors text-white font-extrabold text-lg py-4 rounded-2xl shadow-md shadow-sky-400/50 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}


