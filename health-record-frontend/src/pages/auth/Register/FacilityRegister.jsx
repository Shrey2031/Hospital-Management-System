import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FacilityRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    facilityType: "",
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
      await axios.post("/register-facility", formData);
      alert("Facility registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error: " + err?.response?.data?.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Facility Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Facility Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="facilityType" placeholder="Facility Type (e.g. hospital)" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FacilityRegister;
