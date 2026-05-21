// controllers/prescriptionController.js
import {Prescription} from '../models/Prescription.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {User} from '../models/users.models.js';

// export const createPrescription = async (req, res) => {
//     try {
//         const { appointmentId, medicines, instructions, followUpDate } = req.body;
//         const scannedFile = req.file;

//         let fileUrl = null;
//         if (scannedFile) {
//             const uploadResult = await uploadOnCloudinary(scannedFile.path, {
//                 folder: `prescriptions/${req.user._id}`
//             });
//             if (uploadResult.success) {
//                 fileUrl = uploadResult.url;
//             }
//         }

//         const prescription = new Prescription({
//             appointmentId,
//             patientId: req.body.patientId,
//             doctorId: req.user._id,
//             medicines: JSON.parse(medicines),
//             instructions,
//             followUpDate: followUpDate ? new Date(followUpDate) : null,
//             fileUrl
//         });

//         const savedPrescription = await prescription.save();

//         // Link to appointment
//         await Appointment.findByIdAndUpdate(appointmentId, {
//             prescriptionId: savedPrescription._id,
//             status: 'COMPLETED'
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Prescription created successfully',
//             prescription: savedPrescription
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getMyPrescriptions = async (req, res) => {
//     try {
//         const filter = req.user.role === 'PATIENT' 
//             ? { patientId: req.user.patientId || req.user._id }
//             : { doctorId: req.user._id };

//         const prescriptions = await Prescription.find(filter)
//             .populate('appointmentId', 'slot status')
//             .populate('patientId', 'fullName')
//             .sort({ createdAt: -1 });

//         res.json({
//             success: true,
//             prescriptions
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// In prescriptionController.js - getMyPrescriptions
export const getMyPrescriptions = async (req, res) => {
    try {
        const filter = { doctorId: req.user._id };

        const prescriptions = await Prescription.find(filter)
            .populate({
                path: 'patientId',
                select: 'fullname',
                model: 'User'  // Use User model since your patients are Users
            })
            .populate({
                path: 'appointmentId',
                select: 'slot status',
                model: 'Appointment'
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            prescriptions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createPrescription = async (req, res) => {
    try {
        const { appointmentId, medicines, instructions, followUpDate } = req.body;
        const scannedFile = req.file;

        let fileUrl = null;
        if (scannedFile) {
            const uploadResult = await uploadOnCloudinary(scannedFile.path, {
                folder: `prescriptions/${req.user._id}`
            });
            if (uploadResult.success) {
                fileUrl = uploadResult.url;
            }
        }

        const prescription = new Prescription({
            appointmentId,
            patientId: req.body.patientId,
            doctorId: req.user._id,
            medicines: JSON.parse(medicines),
            instructions,
            followUpDate: followUpDate ? new Date(followUpDate) : null,
            fileUrl
        });

        const savedPrescription = await prescription.save();

        res.status(201).json({
            success: true,
            message: 'Prescription created successfully',
            prescription: savedPrescription
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ NEW: Get Patient's Prescriptions with STATS & FILTERS
export const getPatientPrescriptions = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, search } = req.query;
        const skip = (page - 1) * limit;

        // Filter by patient
        const baseFilter = { patientId: req.user.patientId || req.user._id };

        // Filter by status
        if (status && status !== 'all') {
            baseFilter.status = status; // You'll need to add status field to schema
        }

        // Search filter
        let searchFilter = {};
        if (search) {
            searchFilter.$or = [
                { 'medicines.name': { $regex: search, $options: 'i' } },
                { 'patientId.fullName': { $regex: search, $options: 'i' } },
                { 'doctorId.fullName': { $regex: search, $options: 'i' } }
            ];
        }

        // Main query
        const prescriptions = await Prescription.find({ ...baseFilter, ...searchFilter })
            .populate('appointmentId', 'slot status')
            .populate('patientId', 'fullName email')
            .populate('doctorId', 'fullName specialty')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Stats
        const stats = await Prescription.aggregate([
            { $match: baseFilter },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const statsObj = {
            active: 0,
            completed: 0,
            expired: 0,
            total: prescriptions.length
        };

        stats.forEach(stat => {
            if (stat._id === 'active') statsObj.active = stat.count;
            if (stat._id === 'completed') statsObj.completed = stat.count;
            if (stat._id === 'expired') statsObj.expired = stat.count;
        });

        res.json({
            success: true,
            prescriptions,
            stats: statsObj,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: await Prescription.countDocuments(baseFilter)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ NEW: Get Prescription Stats
export const getPrescriptionStats = async (req, res) => {
    try {
        const match = { patientId: req.user.patientId || req.user._id };
        
        const stats = await Prescription.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
                    completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
                    expired: { $sum: { $cond: [{ $eq: ['$status', 'expired'] }, 1, 0] } },
                    totalMedicines: { $sum: { $size: '$medicines' } }
                }
            }
        ]);

        res.json({
            success: true,
            stats: stats[0] || { active: 0, completed: 0, expired: 0, totalMedicines: 0 }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ NEW: Request Refill
export const requestRefill = async (req, res) => {
    try {
        const { prescriptionId, pharmacyId, urgent } = req.body;
        
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        prescription.refillRequests = prescription.refillRequests || [];
        prescription.refillRequests.push({
            date: new Date(),
            pharmacyId,
            urgent: urgent || false,
            status: 'pending'
        });

        await prescription.save();

        res.json({
            success: true,
            message: 'Refill request sent successfully',
            prescription
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ NEW: Download Prescription PDF (mock)
export const downloadPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id)
            .populate('doctorId', 'fullName specialty')
            .populate('patientId', 'fullName');

        // Generate PDF logic here (use pdfkit or puppeteer)
        res.json({
            success: true,
            message: 'PDF generated',
            downloadUrl: `/api/v1/prescriptions/${id}/pdf`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};