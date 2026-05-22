import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AppointmentCard = () => {
  const { token } = useAuth();

  
  const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1`;


  // ✅ Fetch doctor appointments
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctorAppointments"],
    queryFn: async () => {
      const res = await axios.get(
        `${API_BASE_URL}/appointments/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.appointments;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-[#07113d] rounded-3xl p-6">
        <p className="text-white">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#07113d] rounded-3xl p-6">
        <p className="text-red-400">
          Failed to load appointments
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#07113d] rounded-3xl p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Upcoming Appointments
        </h2>

        <span className="text-blue-400 cursor-pointer">
          View all
        </span>
      </div>

      <div className="space-y-4">

        {data?.length === 0 ? (
          <p className="text-gray-400">
            No appointments found
          </p>
        ) : (
          data?.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white/5 p-4 rounded-2xl"
            >
              {/* ✅ Patient Name */}
              <h3 className="font-semibold text-white">
                {appointment.patientId?.fullname}
              </h3>

              {/* ✅ Appointment Type */}
              <p className="text-sm text-gray-400">
                {appointment.type}
              </p>

              <div className="flex justify-between mt-2 text-sm">
                
                {/* ✅ Time */}
                <span className="text-white">
                  {appointment.slot?.startTime}
                </span>

                {/* ✅ Status */}
                <span
                  className={`${
                    appointment.status === "CONFIRMED"
                      ? "text-green-400"
                      : appointment.status === "PENDING"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default AppointmentCard;