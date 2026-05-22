import Sidebar from '../DoctorDashboard/Sidebar';
import {
  Search,
  Bell,
  Eye,
  Download,
  Edit,
  Filter,
  Plus,
  Pill,
  X,
  Trash2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function PrescriptionsPage() {
  const { token } = useAuth();
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

  const queryClient = useQueryClient();
  
  // ✅ Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // ✅ Patient search state
  const [patientSearch, setPatientSearch] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // ✅ Form state
  const [formData, setFormData] = useState({
    patientId: "",
    appointmentId: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
    instructions: "",
    followUpDate: "",
  });

  // ✅ Fetch REAL prescriptions from API
  const { data: prescriptions, isLoading, error } = useQuery({
    queryKey: ["doctorPrescriptions"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_BASE_URL}/prescriptions/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.prescriptions;
    },
  });

  // ✅ Fetch doctor's patients list
  const { data: doctorPatients = [] } = useQuery({
    queryKey: ["doctorPatientsList"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_BASE_URL}/doctors/patients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.patients || [];
    },
    enabled: !!token, // Only run when token exists
  });

  // ✅ Create prescription mutation
  const createPrescriptionMutation = useMutation({
    mutationFn: async (prescriptionData) => {
      const res = await axios.post(
        `${API_BASE_URL}/prescriptions/`,
        prescriptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorPrescriptions"]);
      setShowCreateModal(false);
      resetForm();
      alert("Prescription created successfully!");
    },
    onError: (err) => {
      alert(err.response?.data?.error || "Failed to create prescription");
    },
  });

  // ✅ Transform prescriptions data
  const allPrescriptions = prescriptions?.map((prescription) => ({
    id: prescription._id,
    patient: prescription.patientId?.fullname || "Unknown Patient",
    date: new Date(prescription.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    medicines: prescription.medicines?.map(m => `${m.name} ${m.dosage}`).join(", ") || "N/A",
    instructions: prescription.instructions || "",
    followUpDate: prescription.followUpDate 
      ? new Date(prescription.followUpDate).toLocaleDateString() 
      : "N/A",
    status: prescription.status || "Delivered",
  })) || [];

  // ✅ Calculate stats
  const stats = [
    {
      title: "Total Prescriptions",
      value: allPrescriptions.length.toString(),
      color: "from-purple-500 to-violet-700",
    },
    {
      title: "Delivered",
      value: allPrescriptions.filter(p => p.status === "Delivered").length.toString(),
      color: "from-emerald-500 to-teal-700",
    },
    {
      title: "Pending",
      value: allPrescriptions.filter(p => p.status === "Pending").length.toString(),
      color: "from-orange-500 to-amber-700",
    },
    {
      title: "This Month",
      value: allPrescriptions.filter(p => {
        const prescriptionDate = new Date(p.date);
        const now = new Date();
        return prescriptionDate.getMonth() === now.getMonth() && 
               prescriptionDate.getFullYear() === now.getFullYear();
      }).length.toString(),
      color: "from-blue-500 to-indigo-700",
    },
  ];
const handlePatientInputClick = () => {
  setShowPatientDropdown(true);
  setPatientSearch(""); // Clear search to show all
};
  // Keep your filteredPatients logic:
const filteredPatients = !patientSearch 
  ? doctorPatients || [] 
  : doctorPatients?.filter(patient => 
      patient.fullname?.toLowerCase().includes(patientSearch.toLowerCase())
    ) || [];

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "patientSearch") {
      setPatientSearch(value);
      setShowPatientDropdown(true);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

 // Handle patient selection:
// Select a patient:
const handlePatientSelect = (patient) => {
  setSelectedPatient(patient);
  setFormData(prev => ({ ...prev, patientId: patient._id }));
  setPatientSearch(patient.fullname);
  setShowPatientDropdown(false);
};

// Clear selection:
const clearPatientSelection = () => {
  setSelectedPatient(null);
  setFormData(prev => ({ ...prev, patientId: "" }));
  setPatientSearch("");
};

  // ✅ Handle medicine change
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][field] = value;
    setFormData(prev => ({ ...prev, medicines: updatedMedicines }));
  };

  // ✅ Add new medicine row
  const addMedicineRow = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: "", dosage: "", frequency: "", duration: "" }],
    }));
  };

  // ✅ Remove medicine row
  const removeMedicineRow = (index) => {
    const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, medicines: updatedMedicines }));
  };

  // ✅ Reset form
  const resetForm = () => {
    setSelectedPatient(null);
    setPatientSearch("");
    setFormData({
      patientId: "",
      appointmentId: "",
      medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
      instructions: "",
      followUpDate: "",
    });
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patientId) {
      alert("Please select a patient");
      return;
    }
    
    const filteredMedicines = formData.medicines.filter(m => m.name.trim() !== "");
    
    if (filteredMedicines.length === 0) {
      alert("Please add at least one medicine");
      return;
    }

    const prescriptionData = {
      // ...formData,
       patientId: formData.patientId,
      medicines: JSON.stringify(filteredMedicines),
    };
      // Only add optional fields if they have values
  if (formData.instructions.trim()) {
    prescriptionData.instructions = formData.instructions;
  }

  if (formData.followUpDate) {
    prescriptionData.followUpDate = formData.followUpDate;
  }

    createPrescriptionMutation.mutate(prescriptionData);
  };

  // // ✅ Filter patients based on search
  // const filteredPatients = doctorPatients?.filter(patient => 
  //   patient.fullname?.toLowerCase().includes(patientSearch.toLowerCase())
  // ) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
            <p className="text-xl">Loading prescriptions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 flex items-center justify-center">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
            <p className="text-red-400 text-xl">Failed to load prescriptions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 bg-gradient-to-br from-[#dfe6ff] to-[#b7c7ff] p-6 overflow-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#111827]">
              Prescriptions 💊
            </h1>
            <p className="text-gray-600 mt-2">
              Create and manage patient prescriptions.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white rounded-2xl px-5 py-3 flex items-center w-[340px] shadow-lg">
              <input type="text" placeholder="Search prescriptions..." className="outline-none flex-1" />
              <Search className="text-gray-500" />
            </div>
            <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Bell />
            </button>
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Doctor"
              className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
            >
              <h1 className="text-4xl font-bold">{card.value}</h1>
              <p className="mt-2 text-gray-200">{card.title}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* LEFT: Prescriptions List */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            <div className="bg-[#07113d] rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Recent Prescriptions</h2>
                <div className="flex gap-4">
                  <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all">
                    <Filter size={18} />
                    Filter
                  </button>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus size={18} />
                    New Prescription
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="pb-4">Patient</th>
                      <th>Date</th>
                      <th>Medicines</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPrescriptions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-400">
                          No prescriptions found
                        </td>
                      </tr>
                    ) : (
                      allPrescriptions.map((prescription, index) => (
                        <tr key={prescription.id} className="border-b border-white/5 hover:bg-white/5 transition">
                          <td className="py-5 flex items-center gap-4">
                            <img
                              src={`https://i.pravatar.cc/100?img=${index + 50}`}
                              alt=""
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold">{prescription.patient}</h3>
                              <p className="text-gray-400 text-xs">{prescription.followUpDate !== "N/A" ? `Follow-up: ${prescription.followUpDate}` : ""}</p>
                            </div>
                          </td>
                          <td>{prescription.date}</td>
                          <td className="max-w-xs">
                            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-xl text-sm block truncate">
                              {prescription.medicines}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`px-3 py-1 rounded-xl text-sm font-medium ${
                                prescription.status === "Delivered"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : "bg-orange-500/20 text-orange-300"
                              }`}
                            >
                              {prescription.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-3">
                              <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                                <Eye size={18} />
                              </button>
                              <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                                <Edit size={18} />
                              </button>
                              <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
                                <Download size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Quick Prescription */}
          <div className="col-span-12 xl:col-span-4 space-y-6">
            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Quick Prescription</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                <Pill size={20} />
                Generate Prescription
              </button>
            </div>

            <div className="bg-[#07113d] rounded-3xl p-6 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Popular Medicines</h2>
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 px-4 rounded-2xl flex items-center gap-3 transition text-left">
                  <Pill size={18} />
                  Paracetamol 500mg
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 px-4 rounded-2xl flex items-center gap-3 transition text-left">
                  <Pill size={18} />
                  Amlodipine 5mg
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 px-4 rounded-2xl flex items-center gap-3 transition text-left">
                  <Pill size={18} />
                  Metformin 500mg
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ CREATE PRESCRIPTION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#07113d] rounded-3xl p-8 text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold">Create Prescription</h2>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition"
              >
                <X size={24} />
              </button>
            </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
              
                     {/* ✅ PATIENT SELECT - Click to Show All Patients */}
<div className="relative">
  <label className="block text-gray-400 text-sm mb-2">Select Patient *</label>
  
  {/* Input Field - Click to show dropdown */}
  <div 
    className="relative cursor-pointer"
    onClick={handlePatientInputClick}
  >
    <div
      className={`w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 pr-10 text-white ${
        selectedPatient ? 'text-white' : 'text-gray-400'
      }`}
    >
      {selectedPatient 
        ? `${selectedPatient.fullname} (${selectedPatient.phone})` 
        : "Click to select patient..."
      }
    </div>
    
    {/* Clear button */}
    {selectedPatient && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent dropdown from opening
          clearPatientSelection();
        }}
        className="absolute right-3 top-3 text-gray-400 hover:text-white"
      >
        <X size={18} />
      </button>
    )}
    
    {/* Dropdown arrow */}
    <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
  
  {/* ✅ Dropdown - Shows ALL patients when clicked */}
  {showPatientDropdown && (
    <div className="absolute z-50 w-full mt-1 bg-[#1a1a4a] rounded-xl shadow-xl border border-white/10 max-h-72 overflow-y-auto">
      
      {/* Search input inside dropdown */}
      <div className="p-2 border-b border-white/10">
        <input
          type="text"
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
          placeholder="Search patients..."
          className="w-full bg-white/10 rounded-lg p-2 text-white placeholder-gray-400 outline-none"
          autoFocus
          onClick={(e) => e.stopPropagation()} // Don't close dropdown
        />
      </div>
      
      {/* Patients List */}
      <div className="max-h-48 overflow-y-auto">
        {filteredPatients.length === 0 ? (
          <div className="p-4 text-gray-400 text-center">
            No patients found
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <button
              key={patient._id}
              type="button"
              onClick={() => handlePatientSelect(patient)}
              className={`w-full p-3 text-left hover:bg-white/10 flex items-center gap-3 transition border-b border-white/5 ${
                selectedPatient?._id === patient._id ? 'bg-purple-500/20' : ''
              }`}
            >
              <img
                src={`https://i.pravatar.cc/100?u=${patient._id}`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{patient.fullname}</p>
                <p className="text-gray-400 text-xs">{patient.phone}</p>
              </div>
              {selectedPatient?._id === patient._id && (
                <span className="text-green-400">✓</span>
              )}
            </button>
          ))
        )}
      </div>
      
      {/* Footer - Patient count */}
      <div className="p-2 border-t border-white/10 text-gray-500 text-xs text-center">
        {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} available
      </div>
    </div>
  )}
</div>

{/* Close dropdown when clicking outside */}
{showPatientDropdown && (
  <div 
    className="fixed inset-0 z-40" 
    onClick={() => setShowPatientDropdown(false)} 
  />
)}

              {/* Appointment ID (Optional) */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Appointment ID (Optional)</label>
                <input
                  type="text"
                  name="appointmentId"
                  value={formData.appointmentId}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Enter appointment ID"
                />
              </div>

              {/* Medicines Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-400 text-sm">Medicines *</label>
                  <button
                    type="button"
                    onClick={addMedicineRow}
                    className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Medicine
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.medicines.map((medicine, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Medicine Name */}
                        <input
                          type="text"
                          value={medicine.name}
                          onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                          className="bg-white/10 rounded-lg p-2 outline-none text-white placeholder-gray-400"
                          placeholder="Medicine name"
                        />
                        
                        {/* Dosage */}
                        <input
                          type="text"
                          value={medicine.dosage}
                          onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                          className="bg-white/10 rounded-lg p-2 outline-none text-white placeholder-gray-400"
                          placeholder="Dosage (e.g., 500mg)"
                        />
                        
                        {/* Frequency */}
                        <input
                          type="text"
                          value={medicine.frequency}
                          onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                          className="bg-white/10 rounded-lg p-2 outline-none text-white placeholder-gray-400"
                          placeholder="Frequency (e.g., 2 times/day)"
                        />
                        
                        {/* Duration */}
                        <input
                          type="text"
                          value={medicine.duration}
                          onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                          className="bg-white/10 rounded-lg p-2 outline-none text-white placeholder-gray-400"
                          placeholder="Duration (e.g., 7 days)"
                        />
                      </div>
                      
                      {/* Remove Button */}
                      {formData.medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicineRow(index)}
                          className="mt-2 text-red-400 text-sm hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none text-white placeholder-gray-400"
                  placeholder="Enter instructions (e.g., take after meals)"
                />
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Follow-up Date (Optional)</label>
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-xl p-3 outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-white/10 py-4 rounded-xl hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createPrescriptionMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 py-4 rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {createPrescriptionMutation.isPending ? "Creating..." : "Create Prescription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}