import axios from 'axios';
import React, { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    fullname:'',
    email: '',
    phone: '',
    age:'',
    password: '',
    address: '',
    bloodgroup: '',
    gender: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   if (!form.checkValidity()) {
  //     form.reportValidity();
  //     return;
  //   }
  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append('username', formData.username);
  formDataToSend.append('fullname', formData.fullname);

  formDataToSend.append('email', formData.email);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('gender', formData.gender);
  formDataToSend.append('address', formData.address);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('bloodGroup', formData.bloodgroup);
  formDataToSend.append('age',formData.age); // hardcoded or dynamically collected if needed

  // If you add avatar upload in form later
  // formDataToSend.append('avatar', fileInput.files[0]);

  try {
    const res = await axios.post('http://localhost:3000/api/v1/register/user', 
       formData,
       {
         headers: {
          'Content-Type': 'application/json',
        },
    });

    
      if (res.status === 200 || res.status === 201) {
  alert('Registration successful!');
  // ...rest of success logic
  setFormData({
        fullname: '',
        username: '',
        email: '',
        phone: '',
        age:'',
        password: '',
        address: '',
        bloodgroup: '',
        gender: '',
      });
      setSubmitted(true);
} else {
  alert(`Error: ${res?.data?.message || 'Something went wrong'}`);
}
  }
 catch (error) {
    console.error(error);
    alert('Network error or server is down.');
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
          Register Your Account
        </h1>
        <p className="text-center text-blue-700 mb-10 font-medium">
          Create your account to manage your health records securely.
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Full Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-blue-900 font-semibold mb-1"
            >
              Full Name
            </label>
            
            <input
              id="fullname"
              name="fullname"
              type="text"
              required
              value={formData.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          {/* username */}
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-blue-900 font-semibold mb-1"
            >
              User Name
            </label>
            
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
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
              placeholder="email@example.com"
              autoComplete="email"
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
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1-234-567-8901"
              autoComplete="tel"
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

          

               {/* Blood Group */}
          <div className="relative">
            <label
              htmlFor="bloodgroup"
              className="block text-blue-900 font-semibold mb-1"
            >
              Blood Group
            </label>
         
            <select
              id="bloodgroup"
              name="bloodgroup"
              required
              value={formData.bloodgroup}
              onChange={handleChange}
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            >
              <option value="" disabled>
                Select your blood group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Age */}
           <div className="relative">
            <label
              htmlFor="experienceInYears"
              className="block text-blue-900 font-semibold mb-1"
            >
              Age (Years)
            </label>
         
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              max="60"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="5"
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          
          {/* Address (span two columns) */}
          <div className="relative md:col-span-2">
            <label
              htmlFor="address"
              className="block text-blue-900 font-semibold mb-1"
            >
              Address
            </label>
           
            <textarea
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={3}
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition resize-none"
            />
          </div>

         

          {/* Gender (span two columns) */}
          <fieldset
            className="md:col-span-2"
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
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="accent-sky-500 mr-2 w-5 h-5"
                />
                Male
              </label>
              <label className="flex items-center cursor-pointer select-none text-blue-900 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="accent-sky-500 mr-2 w-5 h-5"
                />
                Female
              </label>
              <label className="flex items-center cursor-pointer select-none text-blue-900 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                  className="accent-sky-500 mr-2 w-5 h-5"
                />
                Other
              </label>
            </div>
          </fieldset>

          {/* Submit Button (span two columns) */}
          <button
            type="submit"
            aria-label="Register account"
            className="md:col-span-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors text-white font-extrabold text-lg py-4 rounded-2xl shadow-md shadow-sky-400/50 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}


