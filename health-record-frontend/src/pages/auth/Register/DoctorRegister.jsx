import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorRegister= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    licenseNumber: "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register/doctor", formData);
      alert("Doctor registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error: " + err?.response?.data?.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} />
        <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default DoctorRegister;
