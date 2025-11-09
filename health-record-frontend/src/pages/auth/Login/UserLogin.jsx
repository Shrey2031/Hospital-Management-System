// src/pages/LoginPatient.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/v1/login/user',
        {
          email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
          username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
          password,
        },
        { withCredentials: true }
      );
      console.log('Login successful', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Patient Login</h2>
        <input
          type="text"
          placeholder="Email or Username"
          className="w-full p-2 border rounded mb-4"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-sky-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;


// Repeat this file structure for:
// LoginDoctor.jsx → POST to /api/v1/doctors/login
// LoginFacility.jsx → POST to /api/v1/facilities/login

// Just update the endpoint and heading accordingly.
