// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../../context/AuthContext';
// import { format } from 'date-fns';
// import { Calendar, Video, X, Eye, Clock, MapPin, Phone, ChevronLeft } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const AppointmentCard = () => {
//   const { user, token, loading: authLoading } = useAuth();
//   const [showAllAppointments, setShowAllAppointments] = useState(false);

//   const appointmentsQuery = useQuery({
//     queryKey: ['patient-appointments-card', user?._id],
//     queryFn: () => axios.get(`http://localhost:3000/api/v1/appointments/my/`, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => res.data),
//     enabled: !!user?._id && !!token && !authLoading,
//     staleTime: 2 * 60 * 1000,
//   });

//   const rawAppointmentsData = appointmentsQuery.data;
//   const realAppointments = Array.isArray(rawAppointmentsData)
//     ? rawAppointmentsData
//     : rawAppointmentsData?.appointments || rawAppointmentsData?.data?.appointments || [];

//   const upcomingAppointments = realAppointments.filter(appointment => !!appointment?._id);

//   // Modal Close Handler
//   const closeModal = () => setShowAllAppointments(false);

//   if (authLoading || appointmentsQuery.isLoading) {
//     return (
//       <div className="bg-[#09153d] rounded-3xl p-6 text-white animate-pulse">
//         <div className="h-8 bg-white/20 rounded-lg w-48 mb-6"></div>
//         <div className="space-y-4">
//           <div className="h-24 bg-white/10 rounded-2xl"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Main Card */}
//       <div className="bg-[#09153d] rounded-3xl p-6 text-white">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Appointments</h2>
//           <button 
//             onClick={() => setShowAllAppointments(true)}
//             className="text-blue-400 hover:text-blue-300 font-semibold transition-all flex items-center space-x-1 group hover:underline"
//           >
//             <Eye className="w-4 h-4 group-hover:rotate-90 transition-transform" />
//             <span>View all ({realAppointments.length})</span>
//           </button>
//         </div>

//         {appointmentsQuery.isError ? (
//           <div className="text-center py-8">
//             <p className="text-gray-400 text-sm mb-4">Failed to load appointments</p>
//             <button 
//               onClick={() => appointmentsQuery.refetch()}
//               className="text-blue-400 hover:text-blue-300 text-sm font-medium"
//             >
//               Retry
//             </button>
//           </div>
//         ) : realAppointments.length === 0 ? (
//           <div className="text-center py-12">
//             <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
//             <p className="text-gray-400 mb-2">No appointments found</p>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {upcomingAppointments.slice(0, 3).map((appointment) => {
//               const doctorName = appointment.doctorId?.fullname || 'Doctor';
//               const doctorSpecialty = appointment.doctorId?.specialty || appointment.type || 'General Checkup';

//               return (
//                 <div key={appointment._id} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-all group border border-white/20 cursor-pointer hover:shadow-xl">
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-bold text-white text-lg truncate mb-1">
//                         Dr. {doctorName.split(' ')[0] || 'Doctor'}
//                       </h3>
//                       <p className="text-gray-300 text-sm mb-2 truncate">
//                         {doctorSpecialty} • {appointment.notes || 'General checkup'}
//                       </p>
                      
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
//                         appointment.status === 'CONFIRMED' 
//                           ? 'bg-green-500/30 text-green-200 border border-green-400/50' 
//                           : appointment.status === 'PENDING'
//                           ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
//                           : 'bg-gray-500/30 text-gray-300 border border-gray-400/50'
//                       }`}>
//                         ● {appointment.status || 'Confirmed'}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/10 pt-3">
//                     <div className="flex items-center space-x-2 text-gray-300">
//                       <Calendar className="w-4 h-4 flex-shrink-0" />
//                       <span className="truncate">
//                         {appointment.slot?.date 
//                           ? format(new Date(appointment.slot.date), 'MMM dd, yyyy') 
//                           : 'TBD'
//                         }
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-end space-x-2 text-gray-300">
//                       <span className="font-semibold text-white">
//                         {appointment.slot?.startTime || 'TBD'}
//                       </span>
//                       {appointment.type === 'VIDEO' && (
//                         <Video className="w-4 h-4 text-blue-400" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-full py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl border border-blue-500/30">
//           + Book New Appointment
//         </button>
//       </div>

//       {/* 🔥 VIEW ALL MODAL */}
//       {showAllAppointments && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200" onClick={closeModal}>
//           <div 
//             className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-4xl max-h-[90vh] w-full overflow-hidden shadow-2xl border border-white/10 relative animate-in slide-in-from-bottom-4 duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10 p-6 sticky top-0 z-10">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={closeModal}
//                     className="p-2 hover:bg-white/10 rounded-xl transition-all"
//                   >
//                     <ChevronLeft className="w-6 h-6" />
//                   </button>
//                   <div>
//                     <h2 className="text-2xl font-bold text-white">All Appointments</h2>
//                     <p className="text-gray-400">{realAppointments.length} total</p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => appointmentsQuery.refetch()}
//                   className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center space-x-2"
//                 >
//                   <span>Refresh</span>
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-6 max-h-[70vh] overflow-y-auto">
//               {realAppointments.length === 0 ? (
//                 <div className="text-center py-20">
//                   <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
//                   <p className="text-gray-400 text-lg">No appointments found</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {realAppointments.map((appointment) => {
//                     const doctorName = appointment.doctorId?.fullname || 'Doctor';
//                     const doctorSpecialty = appointment.doctorId?.specialty || appointment.type || 'General Checkup';

//                     return (
//                       <div key={appointment._id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all group">
//                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//                           {/* Doctor Info */}
//                           <div className="lg:col-span-1">
//                             <h3 className="font-bold text-xl text-white mb-2 truncate">
//                               Dr. {doctorName.split(' ')[0]}
//                             </h3>
//                             <p className="text-gray-400 mb-3">{doctorSpecialty}</p>
//                             <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
//                               appointment.status === 'CONFIRMED' 
//                                 ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
//                                 : appointment.status === 'PENDING'
//                                 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
//                                 : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
//                             }`}>
//                               {appointment.status}
//                             </span>
//                           </div>

//                           {/* Date/Time */}
//                           <div className="lg:col-span-1 grid grid-cols-2 gap-6 text-sm">
//                             <div className="space-y-1">
//                               <div className="flex items-center text-gray-400 mb-1">
//                                 <Calendar className="w-4 h-4 mr-2" />
//                                 <span>Date</span>
//                               </div>
//                               <div className="font-bold text-lg text-white">
//                                 {appointment.slot?.date 
//                                   ? format(new Date(appointment.slot.date), 'MMM dd, yyyy') 
//                                   : 'TBD'
//                                 }
//                               </div>
//                             </div>
//                             <div className="space-y-1">
//                               <div className="flex items-center text-gray-400 mb-1">
//                                 <Clock className="w-4 h-4 mr-2" />
//                                 <span>Time</span>
//                               </div>
//                               <div className="font-bold text-lg text-white">
//                                 {appointment.slot?.startTime} - {appointment.slot?.endTime}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Type/Notes */}
//                           <div className="lg:col-span-1 text-right lg:text-left">
//                             <div className="flex flex-col space-y-3">
//                               <div className="flex items-center justify-end lg:justify-start space-x-2">
//                                 <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                                   appointment.type === 'VIDEO' 
//                                     ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
//                                     : appointment.type === 'PHONE'
//                                     ? 'bg-green-500/20 text-green-300 border border-green-500/30'
//                                     : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
//                                 }`}>
//                                   {appointment.type}
//                                 </div>
//                                 {appointment.type === 'VIDEO' && (
//                                   <Video className="w-5 h-5 text-blue-400" />
//                                 )}
//                               </div>
//                               <p className="text-gray-400 text-sm italic bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
//                                 "{appointment.notes || 'No notes'}"
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AppointmentCard;

import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { Calendar, Video, X, Eye, Clock, MapPin, Phone, ChevronLeft, Plus, User, Stethoscope, Clock as ClockIcon ,
   EllipsisVertical, XCircle
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AppointmentCard = () => {
  const { user, token, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [menuStates, setMenuStates] = useState({});
  
  // Book appointment form state
  
  const API_BASE_URL = 'http://localhost:3000/api/v1';
  
  const [bookForm, setBookForm] = useState({
    doctorId: '',
    type: 'IN_PERSON',
    slot: {
      date: '',
      startTime: '',
      endTime: ''
    },
    notes: ''
  });

  const toggleMenu = useCallback((appointmentId, open) => {
  setMenuStates(prev => ({
    ...prev,
    [appointmentId]: open !== undefined ? open : !prev[appointmentId]
  }));
}, []);

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

 // 🔥 REPLACE your appointmentsQuery too
const appointmentsQuery = useQuery({
  queryKey: ['patient-appointments-card', user?._id],
  queryFn: () => apiCall(`${API_BASE_URL}/appointments/my/`),
  enabled: !!user?._id && !!token && !authLoading,
  staleTime: 2 * 60 * 1000,
  onSuccess: (data) => console.log('📅 Appointments loaded:', data?.length || 0),
  onError: (err) => {
    console.error('Appointments error:', err);
    toast.error('Failed to load appointments');
  }
});



  // 🔥 REPLACE your doctorsQuery with this EXACT working version
const doctorsQuery = useQuery({
  queryKey: ['available-doctors'],
  queryFn: () => apiCall(`${API_BASE_URL}/doctors/get-doctors`),
  enabled: !!token && !!user?._id,
  staleTime: 5 * 60 * 1000,
  onSuccess: (data) => console.log('👨‍⚕️ Doctors loaded:', data?.length),
  onError: () => toast.error('Failed to load doctors')
});


  // Create appointment mutation
// 🔥 UPDATE mutation to match PatientDashboard booking
const createAppointmentMutation = useMutation({
  mutationFn: (appointmentData) => axios.post(`${API_BASE_URL}/appointments/`, appointmentData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }),
  onSuccess: () => {
    toast.success('Appointment booked successfully!');
    setShowBookModal(false);
    setBookForm({
      doctorId: '',
      type: 'IN_PERSON',
      slot: { date: '', startTime: '', endTime: '' },
      notes: ''
    });
    // 🔥 Use refetch instead of invalidateQueries
    appointmentsQuery.refetch();
  },
  onError: (error) => {
    toast.error(error.response?.data?.message || error.response?.data?.error || 'Failed to book appointment');
  }
});

// 🔥 ADD THIS DELETE MUTATION (after your createAppointmentMutation)
const deleteAppointmentMutation = useMutation({
  mutationFn: (appointmentId) => axios.delete(`${API_BASE_URL}/appointments/${appointmentId}/cancel`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  onSuccess: () => {
    toast.success('Appointment cancelled successfully!');
    appointmentsQuery.refetch(); // Refresh list immediately
  },
  onError: (error) => {
    toast.error(error.response?.data?.message || 'Failed to cancel appointment');
  }
});

  const rawAppointmentsData = appointmentsQuery.data;
  const realAppointments = Array.isArray(rawAppointmentsData)
    ? rawAppointmentsData
    : rawAppointmentsData?.appointments || rawAppointmentsData?.data?.appointments || [];

  const upcomingAppointments = realAppointments.filter(appointment => !!appointment?._id);

  // Modal Close Handlers
  const closeModal = () => setShowAllAppointments(false);
  const closeBookModal = () => setShowBookModal(false);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookForm.doctorId || !bookForm.slot.date || !bookForm.slot.startTime || !bookForm.slot.endTime) {
      toast.error('Please fill all required fields');
      return;
    }
    createAppointmentMutation.mutate(bookForm);
  };

  if (authLoading || appointmentsQuery.isLoading) {
    return (
      <div className="bg-[#09153d] rounded-3xl p-6 text-white animate-pulse">
        <div className="h-8 bg-white/20 rounded-lg w-48 mb-6"></div>
        <div className="space-y-4">
          <div className="h-24 bg-white/10 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Card */}
      <div className="bg-[#09153d] rounded-3xl p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Appointments</h2>
          <button 
            onClick={() => setShowAllAppointments(true)}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-all flex items-center space-x-1 group hover:underline"
          >
            <Eye className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>View all ({realAppointments.length})</span>
          </button>
        </div>

        {appointmentsQuery.isError ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm mb-4">Failed to load appointments</p>
            <button 
              onClick={() => appointmentsQuery.refetch()}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Retry
            </button>
          </div>
        ) : realAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 mb-2">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-5">
          {upcomingAppointments.slice(0, 3).map((appointment) => {
  const doctorName = appointment.doctorId?.fullname || 'Doctor';
  const doctorSpecialty = appointment.doctorId?.specialty || appointment.type || 'General Checkup';
  const isMenuOpen = menuStates[appointment._id] || false; // 🔥 ADD THIS

  return (
    <div key={appointment._id} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-all group border border-white/20 cursor-pointer hover:shadow-xl relative">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg truncate mb-1">
            Dr. {doctorName.split(' ')[0] || 'Doctor'}
          </h3>
          <p className="text-gray-300 text-sm mb-2 truncate">
            {doctorSpecialty} • {appointment.notes || 'General checkup'}
          </p>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            appointment.status === 'CONFIRMED' 
              ? 'bg-green-500/30 text-green-200 border border-green-400/50' 
              : appointment.status === 'PENDING'
              ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50'
              : 'bg-gray-500/30 text-gray-300 border border-gray-400/50'
          }`}>
            ● {appointment.status || 'Confirmed'}
          </span>
        </div>
        
        {/* 🔥 3-DOT MENU BUTTON */}
        <div className="relative ml-2 opacity-70 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(appointment._id);
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
          >
            <EllipsisVertical className="w-4 h-4 text-gray-300 hover:text-white" />
          </button>
          
          {/* 🔥 DROPDOWN MENU */}
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => toggleMenu(appointment._id, false)} />
              <div className="absolute top-8 right-2 w-48 bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                {/* Cancel Appointment */}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    toggleMenu(appointment._id, false);
                    
                    if (confirm('Are you sure you want to cancel this appointment?')) {
                      deleteAppointmentMutation.mutate(appointment._id);
                    }
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-red-500/20 hover:text-red-100 rounded-xl transition-all flex items-center space-x-3 group hover:border hover:border-red-400/50"
                  disabled={deleteAppointmentMutation.isPending}
                >
                  <XCircle className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <span>Cancel Appointment</span>
                </button>
                
                {/* View Details */}
                <button className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-100 rounded-xl transition-all flex items-center space-x-3 group">
                  <Eye className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>View Details</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/10 pt-3">
        <div className="flex items-center space-x-2 text-gray-300">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {appointment.slot?.date 
              ? format(new Date(appointment.slot.date), 'MMM dd, yyyy') 
              : 'TBD'
            }
          </span>
        </div>
        <div className="flex items-center justify-end space-x-2 text-gray-300">
          <span className="font-semibold text-white">
            {appointment.slot?.startTime || 'TBD'}
          </span>
          {appointment.type === 'VIDEO' && (
            <Video className="w-4 h-4 text-blue-400" />
          )}
        </div>
      </div>
    </div>
  );
})}
          </div>
        )}

        <button 
          onClick={() => setShowBookModal(true)}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-full py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl border border-blue-500/30 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* 🔥 BOOK APPOINTMENT MODAL */}
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
                  <button
                    onClick={closeBookModal}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
                    <p className="text-gray-400">Fill in the details below</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleBookSubmit} className="space-y-6">
                {/* Doctor Selection */}
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

                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>Type *</span>
                  </label>
                  <select
                    value={bookForm.type}
                    onChange={(e) => setBookForm({...bookForm, type: e.target.value})}
                    className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="IN_PERSON">In-Person</option>
                    <option value="VIDEO">Video Call</option>
                    <option value="PHONE">Phone Call</option>
                  </select>
                </div>

                {/* Slot Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date *</span>
                  </label>
                  <input
                    type="date"
                    value={bookForm.slot.date}
                    onChange={(e) => setBookForm({...bookForm, slot: {...bookForm.slot, date: e.target.value}})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Slot Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>Start Time *</span>
                    </label>
                    <input
                      type="time"
                      value={bookForm.slot.startTime}
                      onChange={(e) => setBookForm({...bookForm, slot: {...bookForm.slot, startTime: e.target.value}})}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4" />
                      <span>End Time *</span>
                    </label>
                    <input
                      type="time"
                      value={bookForm.slot.endTime}
                      onChange={(e) => setBookForm({...bookForm, slot: {...bookForm.slot, endTime: e.target.value}})}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                    <span>Notes</span>
                  </label>
                  <textarea
                    value={bookForm.notes}
                    onChange={(e) => setBookForm({...bookForm, notes: e.target.value})}
                    rows={3}
                    placeholder="Any specific concerns or requirements..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={createAppointmentMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl border border-blue-500/30 flex items-center justify-center space-x-2"
                >
                  {createAppointmentMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 VIEW ALL MODAL (unchanged) */}
      {showAllAppointments && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200" onClick={closeModal}>
          <div 
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-4xl max-h-[90vh] w-full overflow-hidden shadow-2xl border border-white/10 relative animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-white/10 p-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-white">All Appointments</h2>
                    <p className="text-gray-400">{realAppointments.length} total</p>
                  </div>
                </div>
                <button 
                  onClick={() => appointmentsQuery.refetch()}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center space-x-2"
                >
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {realAppointments.length === 0 ? (
                <div className="text-center py-20">
                  <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg">No appointments found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {realAppointments.map((appointment) => {
                    const doctorName = appointment.doctorId?.fullname || 'Doctor';
                    const doctorSpecialty = appointment.doctorId?.specialty || appointment.type || 'General Checkup';

                    return (
                      <div key={appointment._id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all group">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                          {/* Doctor Info */}
                          <div className="lg:col-span-1">
                            <h3 className="font-bold text-xl text-white mb-2 truncate">
                              Dr. {doctorName.split(' ')[0]}
                            </h3>
                            <p className="text-gray-400 mb-3">{doctorSpecialty}</p>
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                              appointment.status === 'CONFIRMED' 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                : appointment.status === 'PENDING'
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>

                          {/* Date/Time */}
                          <div className="lg:col-span-1 grid grid-cols-2 gap-6 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center text-gray-400 mb-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>Date</span>
                              </div>
                              <div className="font-bold text-lg text-white">
                                {appointment.slot?.date 
                                  ? format(new Date(appointment.slot.date), 'MMM dd, yyyy') 
                                  : 'TBD'
                                }
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center text-gray-400 mb-1">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>Time</span>
                              </div>
                              <div className="font-bold text-lg text-white">
                                {appointment.slot?.startTime} - {appointment.slot?.endTime}
                              </div>
                            </div>
                          </div>

                          {/* Type/Notes */}
                          <div className="lg:col-span-1 text-right lg:text-left">
                            <div className="flex flex-col space-y-3">
                              <div className="flex items-center justify-end lg:justify-start space-x-2">
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  appointment.type === 'VIDEO' 
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                                    : appointment.type === 'PHONE'
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                    : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                                }`}>
                                  {appointment.type}
                                </div>
                                {appointment.type === 'VIDEO' && (
                                  <Video className="w-5 h-5 text-blue-400" />
                                )}
                              </div>
                              <p className="text-gray-400 text-sm italic bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                "{appointment.notes || 'No notes'}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;



