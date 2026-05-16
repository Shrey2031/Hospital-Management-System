// controllers/doctorController.js
import { DoctorProfile } from '../models/doctorProfile.model.js';
import { FacilityProfile } from '../models/FacilityProfile.js';
import { PatientProfile } from '../models/patientProfile.model.js';
import {MedicalRecord} from '../models/medicalRecord.model.js';
import { Appointment } from '../models/appointment.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponce.js';
import { User } from '../models/users.models.js';

export const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await DoctorProfile.findOne({ userId: req.user._id })
            .populate('facilityId', 'name address')
            .select('-__v');

        if (!doctor) {
            return res.status(404).json({ 
                error: 'Doctor profile not found' 
            });
        }

        res.json({
            success: true,
            doctor
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUpdateDoctorProfile = async (req, res) => {
    try {
        const { fullName, specialization, licenseNumber, experience, 
                qualifications, consultationFee, availability } = req.body;

        let doctor = await DoctorProfile.findOne({ userId: req.user._id });

        if (doctor) {
            // Update existing
            doctor.fullName = fullName || doctor.fullName;
            doctor.specialization = specialization || doctor.specialization;
            doctor.licenseNumber = licenseNumber || doctor.licenseNumber;
            doctor.experience = experience || doctor.experience;
            doctor.qualifications = qualifications || doctor.qualifications;
            doctor.consultationFee = consultationFee || doctor.consultationFee;
            doctor.availability = availability || doctor.availability;
        } else {
            // Create new
            doctor = new Doctor({
                userId: req.user._id,
                fullName,
                specialization,
                licenseNumber,
                experience,
                qualifications,
                consultationFee,
                availability
            });
        }

        const savedDoctor = await doctor.save();
        await savedDoctor.populate('facilityId', 'name address');

        res.json({
            success: true,
            message: 'Doctor profile saved successfully',
            doctor: savedDoctor
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctorPatients = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        
        const patients = await Patient.find({
            $or: [
                { fullName: { $regex: search, $options: 'i' } }
            ]
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('userId', 'email phone')
        .sort({ createdAt: -1 });

        const total = await PatientProfile.countDocuments();

        res.json({
            success: true,
            patients,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPatientRecords = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { page = 1, limit = 20, category } = req.query;

        const filter = {
            patientId,
            'access.doctors': req.user._id // Doctor has access
        };

        if (category) filter.category = category;

        const records = await MedicalRecord.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await MedicalRecord.countDocuments(filter);

        res.json({
            success: true,
            records,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctorAppointments = async (req, res) => {
    try {
        const { status, date } = req.query;
        const filter = { doctorId: req.user._id };

        if (status) filter.status = status;
        if (date) filter['slot.date'] = { $gte: new Date(date), $lte: new Date(date) };

        const appointments = await Appointment.find(filter)
            .populate('patientId', 'fullName')
            .populate('facilityId', 'name')
            .sort({ 'slot.date': 1, 'slot.startTime': 1 });

        res.json({
            success: true,
            appointments
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findOneAndUpdate(
            { _id: appointmentId, doctorId: req.user._id },
            { status },
            { new: true }
        ).populate('patientId', 'fullName');

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json({
            success: true,
            message: `Appointment status updated to ${status}`,
            appointment
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// controllers/doctorController.js
// export const getAvailableDoctors = async (req, res) => {
//   try {
//     const doctors = await User.find({ 
//       role: 'doctor', 
//       isActive: true // Add this field if you have it
//     })
//     .select('fullname email specialty phone profileImage')
//     .sort({ fullname: 1 });

//     res.status(200).json(new ApiResponse(200, 200, 'Doctors fetched', doctors));
//   } catch (error) {
//     res.status(500).json(new ApiError(500, 'Failed to fetch doctors'));
//   }
// };

// controllers/doctorController.js - CORRECT VERSION
export const getAvailableDoctors = async (req, res) => {
  try {
    // 🔥 FETCH REAL DOCTORS
    const doctors = await User.find({ 
      role: 'doctor' 
    })
    .select('fullname email specialty phone profileImage')
    .sort({ fullname: 1 });

    console.log('🔍 Found doctors:', doctors.length); // Debug

    // 🔥 CORRECT RESPONSE - ARRAY OF DOCTORS
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Doctors fetched successfully',
      data: doctors,  // ✅ ARRAY OF DOCTOR OBJECTS
      count: doctors.length
    });

  } catch (error) {
    console.error('Doctors error:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message
    });
  }
};