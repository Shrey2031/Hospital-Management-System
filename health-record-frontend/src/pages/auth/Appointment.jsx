import React, { useState, useEffect } from "react";



const departmentsData = {
  Cardiology: ["Dr. John Smith", "Dr. Lisa Ray"],
  Neurology: ["Dr. Mike Jordan", "Dr. Sarah Lee"],
  Orthopedics: ["Dr. Alan Turing", "Dr. Grace Hopper"],
  Pediatrics: ["Dr. Jane Doe", "Dr. Emily Davis"],
};

const genders = ["Male", "Female", "Other"];

// You can replace this with your actual submit handler or api call
const submitAppointment = (data) => {
  alert(`Appointment submitted!\n\n${JSON.stringify(data, null, 2)}`);
};

const SendAppointmentPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    title: "",
    department: "",
    doctor_Name: "",
    hasVisited: false,
    appointment_date: "",
  });

  const [availableDoctors, setAvailableDoctors] = useState([]);

  // Update doctors when department changes
  useEffect(() => {
    if (form.department && departmentsData[form.department]) {
      setAvailableDoctors(departmentsData[form.department]);
      setForm((f) => ({ ...f, doctor_Name: "" })); // reset doctor when department changes
    } else {
      setAvailableDoctors([]);
      setForm((f) => ({ ...f, doctor_Name: "" }));
    }
  }, [form.department]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation example (expand as needed)
    if (!form.fullName || !form.email || !form.phone || !form.department || !form.doctor_Name || !form.appointment_date) {
      alert("Please fill in all required fields.");
      return;
    }
    submitAppointment(form);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      title: "",
      department: "",
      doctor_Name: "",
      hasVisited: false,
      appointment_date: "",
    });
    setAvailableDoctors([]);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Schedule Appointment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={handleChange}
              placeholder="30"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Mr., Mrs., Ms., Dr., etc."
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="department">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {Object.keys(departmentsData).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Name */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="doctor_Name">
              Doctor Name <span className="text-red-500">*</span>
            </label>
            <select
              id="doctor_Name"
              name="doctor_Name"
              value={form.doctor_Name}
              onChange={handleChange}
              required
              disabled={!form.department}
              className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
                form.department
                  ? "border-gray-300 focus:ring-blue-500"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <option value="">
                {form.department
                  ? "Select Doctor"
                  : "Select Department First"}
              </option>
              {availableDoctors.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          {/* Has Visited */}
          <div className="flex items-center space-x-2 mt-6 md:mt-0">
            <input
              id="hasVisited"
              name="hasVisited"
              type="checkbox"
              checked={form.hasVisited}
              onChange={handleChange}
              className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="hasVisited" className="font-semibold select-none">
              Have you visited this doctor before?
            </label>
          </div>

          {/* Appointment Date */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1" htmlFor="appointment_date">
              Appointment Date <span className="text-red-500">*</span>
            </label>
            <input
              id="appointment_date"
              name="appointment_date"
              type="date"
              value={form.appointment_date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
        >
          Send Appointment Request
        </button>
      </form>
    </div>
  );
};

export default SendAppointmentPage;