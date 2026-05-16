// controllers/appointmentController.js
import {Appointment} from '../models/appointment.models.js';
import {DoctorProfile} from '../models/doctorProfile.model.js';
import {PatientProfile} from '../models/patientProfile.model.js';
import { User } from '../models/users.models.js';
import {Notification} from '../models/notification.model.js';



// controllers/appointmentController.js - 100% FIXED
// export const createAppointment = async (req, res) => {
//     try {
//         const { doctorId, type, slot, notes } = req.body;

//         // ✅ Verify doctor exists (User.role = 'DOCTOR')
//         const doctorUser = await User.findById(doctorId).select('role email');
//         if (!doctorUser || doctorUser.role !== 'doctor') {
//             return res.status(404).json({ error: 'Valid doctor required' });
//         }

//         // ✅ Parse slot date
//         const parsedSlot = {
//             date: new Date(slot.date),
//             startTime: slot.startTime,
//             endTime: slot.endTime,
//             duration: 30
//         };

//         // ✅ Create appointment
//         const appointment = new Appointment({
//             patientId: req.user._id,
//             doctorId: doctorId,  // User._id
//             type: type || 'INPERSON',
//             slot: parsedSlot,
//             notes: notes || ''
//         });

//         const savedAppointment = await appointment.save();
//         await savedAppointment.populate('patientId doctorId', 'email role');

//         // ✅ FIXED: Notification (channel as STRING)
//         await Notification.create({
//             userId: doctorId,
//             type: 'APPOINTMENT',
//             title: 'New Appointment Booked',
//             message: `New appointment on ${slot.date}`,
//             data: { appointmentId: savedAppointment._id },
//             channel: 'INAPP'  // ← FIXED: STRING not ARRAY
//         });

//         res.status(201).json({
//             success: true,
//             appointment: savedAppointment
//         });

//     } catch (error) {
//         console.error('Appointment Error:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

// controllers/appointmentController.js - NO POPULATE (Works 100%)
export const createAppointment = async (req, res) => {
    try {
        const { doctorId, type, slot, notes } = req.body;

        const doctorUser = await User.findById(doctorId);
        if (!doctorUser || doctorUser.role !== 'doctor') {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const appointment = new Appointment({
            patientId: req.user._id,
            doctorId,
            type,
            slot: {
                date: new Date(slot.date),
                startTime: slot.startTime,
                endTime: slot.endTime
            },
            notes
        });

        const savedAppointment = await appointment.save();

        // ✅ NO POPULATE - Just return raw data
        res.status(201).json({
            success: true,
            id: savedAppointment._id,
            patientId: savedAppointment.patientId,
            doctorId: savedAppointment.doctorId,
            slot: savedAppointment.slot,
            message: 'Appointment created successfully'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// export const getMyAppointments = async (req, res) => {
//     try {
//         const { status, type, page = 1, limit = 10 } = req.query;
//         const filter = {};

//         if (req.user.role === 'patient') {
//             filter.patientId = req.user.patientId || req.user._id;
//         } else if (req.user.role === 'doctor') {
//             filter.doctorId = req.user._id;
//         }

//         if (status) filter.status = status;
//         if (type) filter.type = type;

//         const appointments = await Appointment.find(filter)
//             .populate('patientId', 'fullName')
//             .populate('doctorId', 'fullName specialization')
//             .populate('facilityId', 'name')
//             .sort({ 'slot.date': -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await Appointment.countDocuments(filter);

//         res.json({
//             success: true,
//             appointments,
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


// controllers/appointmentController.js
// GET /api/v1/appointments/my/
// export const getMyAppointments = async (req, res) => {
//   try {
//     console.log('🔍 Searching for patient:', req.user._id); // DEBUG
    
//     const appointments = await Appointment.find({ 
//       patientId: req.user._id  // ✅ Exact match
//     })
//     .populate({
//       path: 'doctorId',
//       select: 'fullname specialty email avatar',
//       model: 'User'  // ✅ Specify model
//     })
//     .populate({
//       path: 'patientId', 
//       select: 'fullname email',
//       model: 'User'
//     })
//     .lean();  // ✅ Faster query
    
  
    
//     res.json({
//       success: true,
//       appointments,
//       total: appointments.length
//     });
//   } catch (error) {
//     console.error('❌ Get appointments error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const getMyAppointments = async (req, res) => {
  try {

    let filter = {};

    // ✅ Patient sees their appointments
    if (req.user.role === 'patient') {
      filter.patientId = req.user._id;
    }

    // ✅ Doctor sees appointments booked with them
    if (req.user.role === 'doctor') {
      filter.doctorId = req.user._id;
    }

    const appointments = await Appointment.find(filter)
      .populate({
        path: 'doctorId',
        select: 'fullname specialization email ',
        model: 'User'
      })
      .populate({
        path: 'patientId',
        select: 'fullname specialization  phone',
        model: 'User'
      })
      .sort({ 'slot.date': -1 })
      .lean();

    res.json({
      success: true,
      appointments,
      total: appointments.length
    });

  } catch (error) {
    console.error('❌ Get appointments error:', error);
    res.status(500).json({ error: error.message });
  }
};
export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findOneAndUpdate(
            {
                _id: appointmentId,
                $or: [
                    { patientId: req.user.patientId || req.user._id },
                    { doctorId: req.user._id }
                ]
            },
            { status: 'CANCELLED' },
            { new: true }
        ).populate('patientId doctorId', 'fullName email');

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json({
            success: true,
            message: 'Appointment cancelled successfully',
            appointment
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAvailableSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.query;
        const doctor = await DoctorProfile.findById(doctorId).select('availability');

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Simplified slot generation (30min slots)
        const availableSlots = [];
        const targetDate = new Date(date);
        const dayName = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][targetDate.getDay()];

        const dayAvailability = doctor.availability.find(day => day.day === dayName);
        if (dayAvailability) {
            // Generate 30min slots
            const start = new Date(`${date}T${dayAvailability.startTime}`);
            const end = new Date(`${date}T${dayAvailability.endTime}`);
            
            for (let time = start; time < end; time.setMinutes(time.getMinutes() + 30)) {
                availableSlots.push({
                    startTime: time.toTimeString().slice(0, 5),
                    endTime: new Date(time.getTime() + 30*60000).toTimeString().slice(0, 5)
                });
            }
        }

        res.json({
            success: true,
            slots: availableSlots,
            dayAvailability
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// 1. NEXT APPOINTMENT (for overview card)
export const getNextAppointment = async (req, res) => {
  try {
    const nextAppointment = await Appointment.findOne({
      patientId: req.user._id,
      status: { $in: ['PENDING', 'CONFIRMED'] }, // Only upcoming
      'slot.date': { $gte: new Date() } // Future dates only
    })
    .populate('doctorId', 'fullname specialty avatar')
    .sort({ 'slot.date': 1, 'slot.startTime': 1 }) // Soonest first
    .lean();

    res.json({
      success: true,
      data: nextAppointment || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. STATS (for quick stats card)
export const getAppointmentStats = async (req, res) => {
  try {
    const match = { patientId: req.user._id };
    
    const [
      upcomingCount,
      completedCount,
      cancelledCount,
      totalCount
    ] = await Promise.all([
      Appointment.countDocuments({ ...match, status: { $in: ['PENDING', 'CONFIRMED'] }, 'slot.date': { $gte: new Date() } }),
      Appointment.countDocuments({ ...match, status: 'COMPLETED' }),
      Appointment.countDocuments({ ...match, status: 'CANCELLED' }),
      Appointment.countDocuments(match)
    ]);

    res.json({
      success: true,
      data: {
        upcoming: upcomingCount,
        completed: completedCount,
        cancelled: cancelledCount,
        total: totalCount
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};