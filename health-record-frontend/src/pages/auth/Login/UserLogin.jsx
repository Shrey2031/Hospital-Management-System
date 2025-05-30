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
        '/api/v1/login',
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
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Login as Patient</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Email or Username"
          className="w-full p-2 border rounded"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
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
