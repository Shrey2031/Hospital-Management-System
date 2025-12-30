import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export default function RegistrationForm() {
 
  const navigateTo = useNavigate();
   
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [document, setDocument] = useState('');

  // const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocument(file);
    };
  };


   const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
        const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("age", age);
      formData.append("bloodGroup", bloodGroup);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("document", document);
  
     await axios.post(`${BASE_URL}/register/user`, formData, {
       withCredentials: true,
       headers:{"Content-Type":"multipart/form-data"}
     })
     .then((res) => {
        navigateTo("/userdashboard");
        setFullname('');
        setUsername('');
        setEmail('');
        setPassword('');
        setAddress('');
        setAge('');
        setBloodGroup('');
        setPhone('');
        setGender('');
        
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
          Register Your Account
        </h1>
        <p className="text-center text-blue-700 mb-10 font-medium">
          Create your account to manage your health records securely.
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
          onSubmit={handleRegister}
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
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              name="bloodGroup"
              required
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
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
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="5"
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={3}
              className="pl-10 pr-3 py-3 w-full rounded-xl border-2 border-sky-300 bg-sky-50 text-blue-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition resize-none"
            />
          </div>


   

           {/* Avatar upload - spans two columns */}
          <div className="relative md:col-span-2">
            <label
              htmlFor="document"
              className="block text-blue-900 font-semibold mb-1"
            >
              upload your document 
            </label>
            <input
              id="document"
              name="document"
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


