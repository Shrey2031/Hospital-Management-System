import { Prescription } from '../models/Prescription.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Appointment } from '../models/appointment.models.js';

// Doctor-facing: prescriptions a doctor has written. Renamed from
// getMyPrescriptions — that name collided in intent with the
// patient-facing getPatientPrescriptions below, and this one has no stats
// object, so it does NOT match what PrescriptionsPage.jsx expects from
// /prescriptions/my. Mount this on a doctor-specific route instead.
export const getDoctorPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ doctorId: req.user._id })
            .populate({ path: 'patientId', select: 'fullname', model: 'User' })
            .populate({ path: 'appointmentId', select: 'slot status', model: 'Appointment' })
            .sort({ createdAt: -1 });

        res.json({ success: true, prescriptions });
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
            // Was checking uploadResult.success — uploadOnCloudinary returns
            // either null (failure) or Cloudinary's raw response object
            // (success), which has no .success property. That check was
            // always falsy, so fileUrl never got set even on a successful
            // upload. Also using secure_url (https) instead of .url.
            if (uploadResult) {
                fileUrl = uploadResult.secure_url;
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

        // Link back to the appointment — this existed in an earlier
        // commented-out draft but was dropped from the live version.
        if (appointmentId) {
            await Appointment.findByIdAndUpdate(appointmentId, {
                prescriptionId: savedPrescription._id,
                status: 'COMPLETED'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Prescription created successfully',
            prescription: savedPrescription
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Patient-facing: this is the one that matches PrescriptionsPage.jsx's
// actual usage of /prescriptions/my (patient-scoped + stats object).
export const getPatientPrescriptions = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, search } = req.query;
        const skip = (page - 1) * limit;

        const baseFilter = { patientId: req.user._id };
        if (status && status !== 'all') {
            baseFilter.status = status;
        }

        let searchFilter = {};
        if (search) {
            searchFilter.$or = [
                { 'medicines.name': { $regex: search, $options: 'i' } }
            ];
            // Removed 'patientId.fullName'/'doctorId.fullName' regex
            // conditions — Mongo can't regex-match across a populated
            // reference field like that; those clauses never matched
            // anything and just added dead weight to the query.
        }

        const prescriptions = await Prescription.find({ ...baseFilter, ...searchFilter })
            .populate('appointmentId', 'slot status')
            .populate({ path: 'patientId', select: 'fullname email', model: 'User' })
            .populate({ path: 'doctorId', select: 'fullname specialization', model: 'User' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const stats = await Prescription.aggregate([
            { $match: baseFilter },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const statsObj = { active: 0, completed: 0, expired: 0, total: 0 };
        stats.forEach(stat => {
            if (stat._id === 'active') statsObj.active = stat.count;
            if (stat._id === 'completed') statsObj.completed = stat.count;
            if (stat._id === 'expired') statsObj.expired = stat.count;
        });
        statsObj.total = statsObj.active + statsObj.completed + statsObj.expired;

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

export const getPrescriptionStats = async (req, res) => {
    try {
        const match = { patientId: req.user._id };

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

export const requestRefill = async (req, res) => {
    try {
        const { prescriptionId, pharmacyId, urgent } = req.body;

        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

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

// downloadPrescription doesn't actually generate a PDF — it returns a URL
// pointing at itself (/prescriptions/:id/pdf), which isn't a route that
// exists anywhere else in what you've shown me. Left as-is since building
// real PDF generation (pdfkit/puppeteer) is a feature decision, not a bug
// fix — flagging so it's not mistaken for working.
export const downloadPrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id)
            .populate({ path: 'doctorId', select: 'fullname specialization', model: 'User' })
            .populate({ path: 'patientId', select: 'fullname', model: 'User' });

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        res.json({
            success: true,
            message: 'PDF generated',
            downloadUrl: `/api/v1/prescriptions/${id}/pdf`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};