import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    bloodGroup: "",
  });

  const [documentFile, setDocumentFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (documentFile) {
      data.append("avatar", documentFile); // Your backend expects `avatar`
    }

    try {
      const res = await axios.post("/register/user", data);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err?.response?.data?.message);
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
        <input type="file" name="avatar" accept="application/pdf,image/*" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
