import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import {
  CalendarDays, Clock3, Search, Plus, User, Video, MapPin,
  CheckCircle2, AlertCircle, ChevronLeft,
  Stethoscope, Calendar, Clock as ClockIcon
} from "lucide-react";
import { toast } from 'react-hot-toast';
import Sidebar from "../PatientDashboard/Sidebar";
import axios from 'axios';

const inputClass = "w-full bg-[#F7F6F2] border border-[#E4E1D8] rounded-xl px-4 py-3 text-[#12181B] placeholder-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#0E6B64]/25 focus:border-[#0E6B64] transition-all";
const labelClass = "block text-sm font-medium text-[#5B6470] mb-2 flex items-center gap-2";

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

  // Shared GET helper — this was referenced by doctorsQuery below but never
  // defined in the original file, so that query threw a ReferenceError on
  // every load. Restoring the same helper used in AppointmentCard.jsx.
  const apiCall = async (url, options = {}) => {
    const response = await axios.get(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response.data.data || response.data;
  };

  const doctorsQuery = useQuery({
    queryKey: ['available-doctors'],
    queryFn: () => apiCall(`${API_BASE_URL}/doctors/get-doctors`),
    enabled: !!token && !!user?._id,
    staleTime: 5 * 60 * 1000,
    onError: () => toast.error('Failed to load doctors')
  });

  const appointmentsQuery = useQuery({
    queryKey: ['patient-appointments-page', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/appointments/my/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
    enabled: !!user?._id && !!token,
  });

  const nextAppointmentQuery = useQuery({
    queryKey: ['next-appointment', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/appointments/next`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data),
    enabled: !!user?._id && !!token,
  });

  const statsQuery = useQuery({
    queryKey: ['appointment-stats', user?._id],
    queryFn: () => axios.get(`${API_BASE_URL}/appointments/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data.data),
    enabled: !!user?._id && !!token,
  });

  const createAppointmentMutation = useMutation({
    mutationFn: (appointmentData) => axios.post(`${API_BASE_URL}/appointments/`, appointmentData, {
      headers: { Authorization: `Bearer ${token}` }
    }),
    onSuccess: () => {
      toast.success('Appointment booked successfully!');
      setShowBookModal(false);
      setBookForm({ doctorId: '', type: 'IN_PERSON', slot: { date: '', startTime: '', endTime: '' }, notes: '' });
      appointmentsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    }
  });

  const closeBookModal = () => setShowBookModal(false);
  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookForm.doctorId || !bookForm.slot.date || !bookForm.slot.startTime || !bookForm.slot.endTime) {
      toast.error('Please fill all required fields');
      return;
    }
    createAppointmentMutation.mutate(bookForm);
  };

  const appointments = appointmentsQuery.data?.appointments || appointmentsQuery.data || [];
  const nextAppointment = nextAppointmentQuery.data;
  const stats = statsQuery.data || { upcoming: 0, completed: 0 };

  if (appointmentsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex">
        <Sidebar />
        <div className="flex-1 p-8 animate-pulse space-y-6">
          <div className="h-9 w-64 bg-[#E4E1D8] rounded-lg"></div>
          <div className="h-40 bg-white border border-[#E4E1D8] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex">
      <div className="hidden lg:block lg:w-64 xl:w-72 sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-medium text-[#12181B]">Appointments</h1>
              <p className="text-[#5B6470] mt-1.5 text-sm">Manage your upcoming and previous appointments.</p>
            </div>
            <button
              onClick={() => setShowBookModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0E6B64] hover:bg-[#0B4F4A] text-white text-sm font-semibold transition-colors"
            >
              <Plus size={17} /> Book Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl bg-gradient-to-r from-[#0E6B64] to-[#0B4F4A] p-6 text-white lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-medium">Next Appointment</h2>
                  <p className="text-[#CFEDE9] mt-1.5 text-sm">Stay updated with your healthcare schedule.</p>
                </div>
                <div className="h-14 w-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <CalendarDays size={26} />
                </div>
              </div>

              {nextAppointment ? (
                <div className="mt-7 grid md:grid-cols-3 gap-3">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-xs text-[#CFEDE9]">Doctor</p>
                    <h3 className="font-semibold mt-1 text-sm">{nextAppointment.doctorId?.fullname}</h3>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-xs text-[#CFEDE9]">Date & Time</p>
                    <h3 className="font-semibold mt-1 text-sm">
                      {format(new Date(nextAppointment.slot.date), 'MMM dd')} • {nextAppointment.slot.startTime}
                    </h3>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-xs text-[#CFEDE9]">Type</p>
                    <h3 className="font-semibold mt-1 text-sm">
                      {nextAppointment.type === 'VIDEO' ? 'Video Call' : 'In-Person'}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center py-8">
                  <p className="text-[#CFEDE9] text-sm">No upcoming appointments</p>
                </div>
              )}
            </div>

            <div className="bg-white border border-[#E4E1D8] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-serif font-medium text-[#12181B]">Quick Stats</h2>
                <Clock3 size={17} className="text-[#0E6B64]" />
              </div>
              <div className="space-y-3">
                <div className="bg-[#F7F6F2] rounded-xl p-4 border border-[#E4E1D8]">
                  <p className="text-[#8A929B] text-xs">Upcoming</p>
                  <h3 className="text-2xl font-serif font-semibold mt-1 text-[#12181B]">{stats.upcoming || 0}</h3>
                </div>
                <div className="bg-[#F7F6F2] rounded-xl p-4 border border-[#E4E1D8]">
                  <p className="text-[#8A929B] text-xs">Completed</p>
                  <h3 className="text-2xl font-serif font-semibold mt-1 text-[#12181B]">{stats.completed || 0}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E1D8] rounded-2xl p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-serif font-medium text-[#12181B]">Upcoming Appointments</h2>
              <div className="flex items-center gap-2.5 bg-[#F7F6F2] border border-[#E4E1D8] px-4 py-3 rounded-xl w-full md:w-[300px]">
                <Search className="text-[#8A929B]" size={16} />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="bg-transparent outline-none text-sm text-[#12181B] placeholder-[#8A929B] w-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              {appointmentsQuery.isError ? (
                <p className="text-[#E8623F] text-center py-8 text-sm">Failed to load appointments</p>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12 text-[#8A929B]">
                  <CalendarDays size={40} className="mx-auto mb-4 opacity-60" />
                  <p className="text-sm">No appointments found</p>
                </div>
              ) : (
                appointments
                  .filter(apt => ['PENDING', 'CONFIRMED'].includes(apt.status))
                  .map((appointment) => (
                    <div key={appointment._id} className="bg-[#F7F6F2] border border-[#E4E1D8] rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:border-[#0E6B64]/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-[#E4F1EF] flex items-center justify-center text-[#0E6B64] shrink-0">
                          <User size={19} />
                        </div>
                        <div>
                          <h3 className="text-[#12181B] font-semibold text-sm">
                            Dr. {appointment.doctorId?.fullname?.split(' ')[0] || 'Doctor'}
                          </h3>
                          <p className="text-[#8A929B] text-xs mt-0.5">{appointment.doctorId?.specialty || 'Specialist'}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-5 text-xs text-[#5B6470]">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {format(new Date(appointment.slot.date), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {appointment.slot.startTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {appointment.type === 'VIDEO' ? <Video size={14} /> : <MapPin size={14} />}
                          {appointment.type === 'VIDEO' ? 'Video Call' : 'In-Person'}
                        </div>
                      </div>

                      <div>
                        {appointment.status === 'CONFIRMED' ? (
                          <span className="flex items-center gap-1.5 bg-[#E4F1EF] text-[#0B4F4A] px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit">
                            <CheckCircle2 size={14} /> Confirmed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 bg-[#FBF0E0] text-[#8A5A16] px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit">
                            <AlertCircle size={14} /> Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* BOOK APPOINTMENT MODAL */}
          {showBookModal && (
            <div className="fixed inset-0 bg-[#12181B]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeBookModal}>
              <div
                className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl border border-[#E4E1D8]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-b border-[#E4E1D8] p-6 sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <button onClick={closeBookModal} className="p-2 hover:bg-[#F7F6F2] rounded-lg transition-all">
                      <ChevronLeft size={20} className="text-[#5B6470]" />
                    </button>
                    <div>
                      <h2 className="text-lg font-serif font-medium text-[#12181B]">Book Appointment</h2>
                      <p className="text-[#8A929B] text-xs">Fill in the details below</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <form onSubmit={handleBookSubmit} className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        <User size={15} />
                        <span>Select Doctor *</span>
                      </label>
                      <select
                        value={bookForm.doctorId}
                        onChange={(e) => setBookForm({ ...bookForm, doctorId: e.target.value })}
                        className={inputClass}
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

                    <div>
                      <label className={labelClass}>
                        <Stethoscope size={15} />
                        <span>Type *</span>
                      </label>
                      <select
                        value={bookForm.type}
                        onChange={(e) => setBookForm({ ...bookForm, type: e.target.value })}
                        className={inputClass}
                        required
                      >
                        <option value="IN_PERSON">In-Person</option>
                        <option value="VIDEO">Video Call</option>
                        <option value="PHONE">Phone Call</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>
                        <Calendar size={15} />
                        <span>Date *</span>
                      </label>
                      <input
                        type="date"
                        value={bookForm.slot.date}
                        onChange={(e) => setBookForm({ ...bookForm, slot: { ...bookForm.slot, date: e.target.value } })}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          <ClockIcon size={15} />
                          <span>Start *</span>
                        </label>
                        <input
                          type="time"
                          value={bookForm.slot.startTime}
                          onChange={(e) => setBookForm({ ...bookForm, slot: { ...bookForm.slot, startTime: e.target.value } })}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <ClockIcon size={15} />
                          <span>End *</span>
                        </label>
                        <input
                          type="time"
                          value={bookForm.slot.endTime}
                          onChange={(e) => setBookForm({ ...bookForm, slot: { ...bookForm.slot, endTime: e.target.value } })}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Notes</label>
                      <textarea
                        value={bookForm.notes}
                        onChange={(e) => setBookForm({ ...bookForm, notes: e.target.value })}
                        rows={3}
                        className={`${inputClass} resize-vertical`}
                        placeholder="Any specific concerns..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={createAppointmentMutation.isPending || doctorsQuery.isLoading}
                      className="w-full bg-[#0E6B64] hover:bg-[#0B4F4A] disabled:opacity-60 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold text-sm text-white transition-colors"
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