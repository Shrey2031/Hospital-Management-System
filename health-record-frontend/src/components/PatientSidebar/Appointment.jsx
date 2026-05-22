import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import {
  CalendarDays, Clock3, Search, Plus, User, Video, MapPin, 
  CheckCircle2, AlertCircle, ShieldCheck, Pill,  ChevronLeft,
    Stethoscope, Calendar, Clock as ClockIcon 
} from "lucide-react";
import { toast } from 'react-hot-toast';
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';

export default function AppointmentsPage() {
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

  const { user, token } = useAuth();
  const [showBookModal, setShowBookModal] = useState(false);
const [bookForm, setBookForm] = useState({
  doctorId: '',
  type: 'IN_PERSON',
  slot: { date: '', startTime: '', endTime: '' },
  notes: ''
});


   // 🔥 Add doctors query (same as AppointmentCard)
  const doctorsQuery = useQuery({
    queryKey: ['available-doctors'],
    queryFn: () => apiCall(`${API_BASE_URL}/doctors/get-doctors`),
    enabled: !!token && !!user?._id,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => console.log('👨‍⚕️ Doctors loaded:', data?.length),
    onError: () => toast.error('Failed to load doctors')
  });

// 🔥 Add create appointment mutation
const createAppointmentMutation = useMutation({
  mutationFn: (appointmentData) => axios.post(`${API_BASE_URL}/appointments/`, appointmentData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  onSuccess: () => {
    toast.success('Appointment booked successfully!');
    setShowBookModal(false);
    setBookForm({ doctorId: '', type: 'IN_PERSON', slot: { date: '', startTime: '', endTime: '' }, notes: '' });
    appointmentsQuery.refetch(); // Refresh main list
  },
  onError: (error) => {
    toast.error(error.response?.data?.message || 'Failed to book appointment');
  }
});

// 🔥 Add these handlers
const closeBookModal = () => setShowBookModal(false);
const handleBookSubmit = (e) => {
  e.preventDefault();
  if (!bookForm.doctorId || !bookForm.slot.date || !bookForm.slot.startTime || !bookForm.slot.endTime) {
    toast.error('Please fill all required fields');
    return;
  }
  createAppointmentMutation.mutate(bookForm);
};


  

  // 🔥 1. MAIN APPOINTMENTS LIST (your EXISTING working query)
  const appointmentsQuery = useQuery({
    queryKey: ['patient-appointments-page', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/appointments/my/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
    enabled: !!user?._id && !!token,
  });

  // 🔥 2. NEXT APPOINTMENT (for overview card)
  const nextAppointmentQuery = useQuery({
    queryKey: ['next-appointment', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/appointments/next`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data),
    enabled: !!user?._id && !!token,
  });

  // 🔥 3. STATS (for quick stats)
  const statsQuery = useQuery({
    queryKey: ['appointment-stats', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/appointments/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data),
    enabled: !!user?._id && !!token,
  });

  const appointments = appointmentsQuery.data?.appointments || appointmentsQuery.data || [];
  const nextAppointment = nextAppointmentQuery.data;
  const stats = statsQuery.data || { upcoming: 0, completed: 0 };

  if (appointmentsQuery.isLoading) {
    return <div className="min-h-screen bg-[#dfe6f7] flex"><div className="flex-1 p-6">Loading...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#dfe6f7] flex">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#081028]">Appointments</h1>
              <p className="text-gray-600 mt-2">Manage your upcoming and previous appointments.</p>
            </div>
            <button 
             onClick={() => setShowBookModal(true)} 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg">
              <Plus size={20} /> Book Appointment
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Next Appointment Card */}
            <div className="rounded-3xl bg-gradient-to-r from-[#7f5af0] to-[#4f6df5] p-6 text-white shadow-xl lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Next Appointment</h2>
                  <p className="text-white/80 mt-2">Stay updated with your healthcare schedule.</p>
                </div>
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                  <CalendarDays size={40} />
                </div>
              </div>

              {nextAppointment ? (
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-sm text-white/70">Doctor</p>
                    <h3 className="font-semibold mt-1">{nextAppointment.doctorId?.fullname}</h3>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-sm text-white/70">Date & Time</p>
                    <h3 className="font-semibold mt-1">
                      {format(new Date(nextAppointment.slot.date), 'MMM dd')} • {nextAppointment.slot.startTime}
                    </h3>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-sm text-white/70">Type</p>
                    <h3 className="font-semibold mt-1">
                      {nextAppointment.type === 'VIDEO' ? 'Video Call' : 'In-Person'}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center py-12">
                  <p className="text-white/70">No upcoming appointments</p>
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-[#08153b] rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Quick Stats</h2>
                <Clock3 className="text-blue-400" />
              </div>
              <div className="space-y-4 mt-6">
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-gray-400 text-sm">Upcoming</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.upcoming || 0}</h3>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-gray-400 text-sm">Completed</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.completed || 0}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-[#08153b] rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Upcoming Appointments</h2>
              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl w-full md:w-[320px]">
                <Search className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
                />
              </div>
            </div>

            <div className="space-y-5">
              {appointmentsQuery.isError ? (
                <p className="text-red-400 text-center py-8">Failed to load appointments</p>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <CalendarDays className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No appointments found</p>
                </div>
              ) : (
                appointments
                  .filter(apt => ['PENDING', 'CONFIRMED'].includes(apt.status))
                  .map((appointment) => (
                    <div key={appointment._id} className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 hover:bg-white/10 transition">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                          <User />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            Dr. {appointment.doctorId?.fullname?.split(' ')[0] || 'Doctor'}
                          </h3>
                          <p className="text-gray-400 text-sm">{appointment.doctorId?.specialty || 'Specialist'}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="text-gray-300 flex items-center gap-2">
                          <CalendarDays size={16} />
                          {format(new Date(appointment.slot.date), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-gray-300 flex items-center gap-2">
                          <Clock3 size={16} />
                          {appointment.slot.startTime}
                        </div>
                        <div className="text-gray-300 flex items-center gap-2">
                          {appointment.type === 'VIDEO' ? <Video size={16} /> : <MapPin size={16} />}
                          {appointment.type === 'VIDEO' ? 'Video Call' : 'In-Person'}
                        </div>
                      </div>

                      <div>
                        {appointment.status === 'CONFIRMED' ? (
                          <span className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                            <CheckCircle2 size={16} /> Confirmed
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm">
                            <AlertCircle size={16} /> Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
          {/* 🔥 BOOK APPOINTMENT MODAL - EXACT COPY FROM APPOINTMENTCARD */}
{showBookModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200" onClick={closeBookModal}>
    <div 
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10 relative animate-in slide-in-from-bottom-4 duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10 p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={closeBookModal} className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
              <p className="text-gray-400">Fill in the details below</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <form onSubmit={handleBookSubmit} className="space-y-6">
          {/* Doctor Selection */}
           {/* Doctor Selection - BULLETPROOF VERSION */}
<div>
  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
    <User className="w-4 h-4" />
    <span>Select Doctor *</span>
  </label>
       <select
    value={bookForm.doctorId}
    onChange={(e) => setBookForm({...bookForm, doctorId: e.target.value})}
    className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    required
    disabled={doctorsQuery.isLoading}
  >
    {doctorsQuery.isLoading ? (
      <option value="">Loading doctors...</option>
    ) : doctorsQuery.isError ? (
      <option value="" disabled>Failed to load doctors</option>
    ) : Array.isArray(doctorsQuery.data) && doctorsQuery.data.length > 0 ? (
      doctorsQuery.data.map((doctor) => (
        <option key={doctor._id} value={doctor._id}>
          Dr. {doctor.fullname || doctor.name || 'Unknown Doctor'} - {doctor.specialty || 'General'}
        </option>
      ))
    ) : (
      <option value="" disabled>No doctors available</option>
    )}
  </select>
</div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
              <Stethoscope className="w-4 h-4" />
              <span>Type *</span>
            </label>
            <select
              value={bookForm.type}
              onChange={(e) => setBookForm({...bookForm, type: e.target.value})}
              className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="IN_PERSON">In-Person</option>
              <option value="VIDEO">Video Call</option>
              <option value="PHONE">Phone Call</option>
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Date *</span>
            </label>
            <input
              type="date"
              value={bookForm.slot.date}
              onChange={(e) => setBookForm({...bookForm, slot: {...bookForm.slot, date: e.target.value}})}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>Start *</span>
              </label>
              <input
                type="time"
                value={bookForm.slot.startTime}
                onChange={(e) => setBookForm({...bookForm, slot: {...bookForm.slot, startTime: e.target.value}})}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>End *</span>
              </label>
              <input
                type="time"
                value={bookForm.slot.endTime}
                onChange={(e) => setBookForm({...bookForm, slot: {...bookForm.slot, endTime: e.target.value}})}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
            <textarea
              value={bookForm.notes}
              onChange={(e) => setBookForm({...bookForm, notes: e.target.value})}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any specific concerns..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={createAppointmentMutation.isPending || doctorsQuery.isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 py-4 rounded-2xl font-semibold shadow-xl transition-all"
          >
            {createAppointmentMutation.isPending ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}