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

// export const getDoctorPatients = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search = '' } = req.query;
        
//         const patients = await Patient.find({
//             $or: [
//                 { fullName: { $regex: search, $options: 'i' } }
//             ]
//         })
//         .limit(limit * 1)
//         .skip((page - 1) * limit)
//         .populate('userId', 'email phone')
//         .sort({ createdAt: -1 });

//         const total = await PatientProfile.countDocuments();

//         res.json({
//             success: true,
//             patients,
//             pagination: {
//                 current: page,
//                 pages: Math.ceil(total / limit),
//                 total
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

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

export const getDoctorDashboardStats = async (req, res) => {
  try {
    const doctorId = req.user._id; // Logged-in doctor

    // ✅ Today's date range (for today's stats)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // ✅ Calculate all stats in parallel (FAST!)
    const [
      totalAppointments,
      todayAppointments,
      completedAppointments,
      totalPatients,
      confirmedAppointments
    ] = await Promise.all([
      // 1. Total appointments ever
      Appointment.countDocuments({ doctorId }),
      
      // 2. Today's appointments
      Appointment.countDocuments({ 
        doctorId, 
        'slot.date': { $gte: startOfDay, $lte: endOfDay } 
      }),
      
      // 3. Total completed appointments
      Appointment.countDocuments({ 
        doctorId, 
        status: 'COMPLETED' 
      }),
      
      // 4. Unique patients (from appointments)
      Appointment.distinct('patientId', { doctorId }).then(ids => ids.length),
      
      // 5. Confirmed appointments
      Appointment.countDocuments({ 
        doctorId, 
        status: 'CONFIRMED' 
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPatients: totalPatients || 0,
        appointments: totalAppointments || 0,     // Total appointments
        labReports: completedAppointments || 0,   // Use completed as proxy
        prescriptions: confirmedAppointments || 0 // Use confirmed as proxy
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch stats' 
    });
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

// Add this to your doctorController.js
export const addNewPatient = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const {
      fullname,
      username,
      email,
      phone,
      password,
      dob,
      gender,
      bloodGroup,
      address,
      medicalHistory
    } = req.body;

    // 🔍 1. Check if patient already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }, { username }],
      role: 'patient'
    });

    if (existingUser) {
      return res.status(400).json(
        new ApiError(400, 'Patient with this email/phone/username already exists')
      );
    }

    // ✅ 2. Create NEW USER (Patient account)
    const newUser = await User.create({
      fullname,
      username,
      email,
      phone,
      password, // You should hash this in your User model pre-save hook
      role: 'patient',
      avatar: `https://ui-avatars.com/api/?name=${fullname}&background=skyblue&color=fff`
    });

    // ✅ 3. Create PatientProfile linked to new user
    const newPatientProfile = await PatientProfile.create({
      userId: newUser._id,
      dob,
      gender,
      bloodGroup,
      address,
      medicalHistory: medicalHistory || ''
    });

    // ✅ 4. Link patient to doctor (add to doctor's patients list)
    // Update doctor's profile to include this patient
    await DoctorProfile.findOneAndUpdate(
      { userId: doctorId },
      { $addToSet: { patients: newUser._id } } // Add to patients array
    );

    res.status(201).json(
      new ApiResponse(201, 201, 'Patient added successfully', {
        patientId: newUser._id,
        fullName: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        profileId: newPatientProfile._id
      })
    );

  } catch (error) {
    console.error('Add patient error:', error);
    res.status(500).json(
      new ApiError(500, 'Failed to add patient')
    );
  }
};

// 🔧 Fix your existing getDoctorPatients function
// export const getDoctorPatients = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '' } = req.query;
//     const doctorId = req.user._id;
    
//     // ✅ Find doctor first to get their patients list
//     const doctor = await DoctorProfile.findOne({ userId: doctorId })
//       .populate({
//         path: 'patients',
//         select: 'fullname email phone avatar',
//         match: { fullname: { $regex: search, $options: 'i' } }
//       });

//     const patients = doctor?.patients || [];
    
//     res.json(
//       new ApiResponse(200, 200, 'Patients fetched', {
//         patients,
//         count: patients.length
//       })
//     );
//   } catch (error) {
//     res.status(500).json(
//       new ApiError(500, error.message)
//     );
//   }
// };
// export const getDoctorPatients = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '' } = req.query;
//     const doctorId = req.user._id;

//     // 🔥 Base filter: Doctor's appointments ONLY
//     let filter = { doctorId };

//     // 🔥 Search by patient name/email/phone
//     if (search) {
//       filter.$or = [
//         { 'patientId.fullname': { $regex: search, $options: 'i' } },
//         { 'patientId.email': { $regex: search, $options: 'i' } },
//         { 'patientId.phone': { $regex: search, $options: 'i' } }
//       ];
//     }

//     // 🔥 Fetch appointments → extract UNIQUE patients
//     const appointments = await Appointment.find(filter)
//       .populate({
//         path: 'patientId',
//         select: 'fullname email phone avatar dob status', // Patient details
//         match: search ? { fullname: { $regex: search, $options: 'i' } } : {}
//       })
//       .populate({
//         path: 'doctorId',
//         select: 'fullname', // Just for verification
//         model: 'User'
//       })
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .lean();

//     // 🔥 Extract UNIQUE patients from appointments
//     const uniquePatients = appointments
//       .filter(appointment => appointment.patientId) // Only populated patients
//       .map(appointment => ({
//         id: appointment.patientId._id,
//         fullname: appointment.patientId.fullname,
//         email: appointment.patientId.email,
//         phone: appointment.patientId.phone,
//         avatar: appointment.patientId.avatar,
//         dob: appointment.patientId.dob,
//         status: appointment.patientId.status || 'Active',
//         lastAppointment: appointment.slot?.date || appointment.createdAt,
//         appointmentCount: 1, // Can aggregate later
//         primaryCondition: appointment.notes || 'General' // From appointment
//       }))
//       .filter((patient, index, self) => 
//         index === self.findIndex(p => p.id === patient.id)
//       ); // Remove duplicates

//     // 🔥 Stats (computed)
//     const stats = {
//       total: uniquePatients.length,
//       active: uniquePatients.filter(p => p.status === 'Active').length,
//       recent: uniquePatients.slice(0, 5).length,
//       appointmentsToday: appointments.filter(a => {
//         const today = new Date();
//         const slotDate = new Date(a.slot?.date);
//         return slotDate.toDateString() === today.toDateString();
//       }).length
//     };

//     res.json(
//       new ApiResponse(200, 200, 'Patients from appointments fetched', {
//         patients: uniquePatients,
//         stats,
//         pagination: {
//           current: parseInt(page),
//           total: uniquePatients.length,
//           limit: parseInt(limit)
//         }
//       })
//     );

//   } catch (error) {
//     console.error('❌ Get doctor patients from appointments error:', error);
//     res.status(500).json(
//       new ApiError(500, error.message)
//     );
//   }
// };

// controllers/doctorController.js
export const getDoctorPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;
    
    console.log("👨‍⚕️ Doctor ID:", doctorId);
    
    // First, check if appointments exist
    const appointments = await Appointment.find({ doctorId });
    // console.log("📅 Total Appointments:", appointments.length);
    
    // Then try populate
    const populatedAppointments = await Appointment.find({ doctorId })
      .populate({
        path: 'patientId',
        select: 'fullname phone',
        model: 'User'
      })
      .lean();
    
    // console.log("👥 Populated Appointments:", populatedAppointments);
    
    // Extract unique patients
    const patientsMap = new Map();
    populatedAppointments.forEach(apt => {
      // console.log("Patient Data:", apt.patientId);
      if (apt.patientId && apt.patientId._id) {
        patientsMap.set(apt.patientId._id.toString(), {
          _id: apt.patientId._id,
          fullname: apt.patientId.fullname,
          phone: apt.patientId.phone,
        });
      }
    });
    
    const patients = Array.from(patientsMap.values());
    // console.log("✅ Final Patients:", patients);
    
    res.json({
      success: true,
      count: patients.length,
      patients
    });
    
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: error.message });
  }
};

