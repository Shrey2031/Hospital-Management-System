// // controllers/medicalRecordController.js
// import {MedicalRecord} from '../models/medicalRecord.model.js';
// import { uploadOnCloudinary } from '../utils/cloudinary.js';
// import {upload} from '../middleware/multer.middleware.js';

// // const upload = multer({ 
// //     dest: 'uploads/',
// //     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// //     fileFilter: (req, file, cb) => {
// //         if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
// //             cb(null, true);
// //         } else {
// //             cb(new Error('Only images and PDFs allowed'), false);
// //         }
// //     }
// // });

// export const uploadMedicalRecord = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const { title, category, doctorId, metadata } = req.body;

//         // Upload to Cloudinary
//         const cloudinaryResult = await uploadOnCloudinary(req.file.path, {
//             folder: `patients/${req.user.patientId || req.user._id}/records`
//         });

//         if (!cloudinaryResult.success) {
//             return res.status(400).json({ error: 'File upload failed' });
//         }

//         // Create record
//         const medicalRecord = new MedicalRecord({
//             patientId: req.user.patientId || req.user._id,
//             uploadedBy: req.user._id,
//             title,
//             category,
//             fileUrl: cloudinaryResult.url,
//             thumbnail: cloudinaryResult.thumbnail,
//             fileSize: cloudinaryResult.size,
//             metadata: JSON.parse(metadata || '{}'),
//             access: {
//                 doctors: doctorId ? [doctorId] : []
//             }
//         });

//         const savedRecord = await medicalRecord.save();

//         res.status(201).json({
//             success: true,
//             message: 'Medical record uploaded successfully',
//             record: savedRecord
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getMyRecords = async (req, res) => {
//     try {
//         const { page = 1, limit = 20, category, search } = req.query;
//         const filter = { patientId: req.user.patientId || req.user._id };

//         if (category) filter.category = category;
//         if (search) filter.title = { $regex: search, $options: 'i' };

//         const records = await MedicalRecord.find(filter)
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await MedicalRecord.countDocuments(filter);

//         res.json({
//             success: true,
//             records,
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

// export const shareRecord = async (req, res) => {
//     try {
//         const { recordId, doctorId, expiresInDays = 7 } = req.body;

//         const record = await MedicalRecord.findOneAndUpdate(
//             { _id: recordId, patientId: req.user.patientId || req.user._id },
//             {
//                 $addToSet: { 'access.doctors': doctorId },
//                 $set: { 'access.expiresAt': new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000) }
//             },
//             { new: true }
//         );

//         if (!record) {
//             return res.status(404).json({ error: 'Record not found' });
//         }

//         res.json({
//             success: true,
//             message: 'Record shared successfully',
//             record
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const deleteRecord = async (req, res) => {
//     try {
//         const { recordId } = req.params;

//         const record = await MedicalRecord.findOneAndDelete({
//             _id: recordId,
//             patientId: req.user.patientId || req.user._id
//         });

//         if (!record) {
//             return res.status(404).json({ error: 'Record not found' });
//         }

//         res.json({
//             success: true,
//             message: 'Record deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Add to medicalRecordController.js
// export const getRecordsStats = async (req, res) => {
//   try {
//     const patientId = req.user.patientId || req.user._id;
    
//     const stats = await MedicalRecord.aggregate([
//       { $match: { patientId } },
//       {
//         $group: {
//           _id: '$category',
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: '$count' },
//           categories: { $push: { category: '$_id', count: '$count' } }
//         }
//       }
//     ]);

//     const result = stats[0] || { total: 0, categories: [] };
    
//     res.json({
//       success: true,
//       data: {
//         totalRecords: result.total,
//         byCategory: Object.fromEntries(
//           result.categories.map(cat => [cat.category.toLowerCase().replace(/\s+/g, '-'), cat.count])
//         )
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// // controllers/medicalRecordController.js - ADD THIS

// // ✅ NEW: Get records shared with a specific doctor
// export const getRecordsForDoctor = async (req, res) => {
//     try {
//         const doctorId = req.user._id;
//         const { page = 1, limit = 20, category, search } = req.query;

//         // Find records where this doctor is in the access list
//         const filter = {
//             'access.doctors': doctorId,
//             'access.expiresAt': { $gt: new Date() } // Not expired
//         };

//         if (category) filter.category = category;
//         if (search) filter.title = { $regex: search, $options: 'i' };

//         const records = await MedicalRecord.find(filter)
//             .populate('patientId', 'fullname email phone')
//             .populate('uploadedBy', 'fullname')
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await MedicalRecord.countDocuments(filter);

//         // Get stats for dashboard
//         const stats = await MedicalRecord.aggregate([
//             { 
//                 $match: { 
//                     'access.doctors': doctorId,
//                     'access.expiresAt': { $gt: new Date() }
//                 } 
//             },
//             {
//                 $group: {
//                     _id: '$status',
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);

//         // Calculate stats
//         const readyCount = stats.find(s => s._id === 'ready')?.count || 0;
//         const processingCount = stats.find(s => s._id === 'processing')?.count || 0;

//         res.json({
//             success: true,
//             records,
//             stats: {
//                 total,
//                 ready: readyCount,
//                 processing: processingCount,
//                 pending: total - readyCount - processingCount
//             },
//             pagination: {
//                 current: parseInt(page),
//                 pages: Math.ceil(total / limit),
//                 total
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ✅ NEW: Get single record details
// export const getRecordDetails = async (req, res) => {
//     try {
//         const { recordId } = req.params;
//         const doctorId = req.user._id;

//         const record = await MedicalRecord.findOne({
//             _id: recordId,
//             'access.doctors': doctorId
//         })
//         .populate('patientId', 'fullname email phone')
//         .populate('uploadedBy', 'fullname');

//         if (!record) {
//             return res.status(404).json({ error: 'Record not found' });
//         }

//         res.json({
//             success: true,
//             record
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// controllers/medicalRecordController.js
import { MedicalRecord } from '../models/medicalRecord.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const uploadMedicalRecord = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { title, category, doctorId, metadata } = req.body;

        const cloudinaryResult = await uploadOnCloudinary(req.file.path, {
            folder: `patients/${req.user._id}/records`
        });

        // Was checking .success (doesn't exist on Cloudinary's response —
        // this always evaluated as failure even on a successful upload).
        if (!cloudinaryResult) {
            return res.status(400).json({ error: 'File upload failed' });
        }

        const medicalRecord = new MedicalRecord({
            patientId: req.user._id,
            uploadedBy: req.user._id,
            title,
            category,
            fileUrl: cloudinaryResult.secure_url,
            // .thumbnail doesn't exist on the default Cloudinary response —
            // would need an explicit eager transform configured to get one.
            // Dropped rather than silently saving `undefined`.
            fileSize: cloudinaryResult.bytes, // was .size, which doesn't exist
            metadata: JSON.parse(metadata || '{}'),
            access: {
                doctors: doctorId ? [doctorId] : []
            }
        });

        const savedRecord = await medicalRecord.save();

        res.status(201).json({
            success: true,
            message: 'Medical record uploaded successfully',
            record: savedRecord
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyRecords = async (req, res) => {
    try {
        const { page = 1, limit = 20, category, search } = req.query;
        const filter = { patientId: req.user._id };

        if (category) filter.category = category;
        if (search) filter.title = { $regex: search, $options: 'i' };

        const records = await MedicalRecord.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await MedicalRecord.countDocuments(filter);

        res.json({
            success: true,
            records,
            pagination: { current: page, pages: Math.ceil(total / limit), total }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const shareRecord = async (req, res) => {
    try {
        const { recordId, doctorId, expiresInDays = 7 } = req.body;

        const record = await MedicalRecord.findOneAndUpdate(
            { _id: recordId, patientId: req.user._id },
            {
                $addToSet: { 'access.doctors': doctorId },
                $set: { 'access.expiresAt': new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000) }
            },
            { new: true }
        );

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({ success: true, message: 'Record shared successfully', record });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        const record = await MedicalRecord.findOneAndDelete({
            _id: recordId,
            patientId: req.user._id
        });

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecordsStats = async (req, res) => {
    try {
        const patientId = req.user._id;

        const stats = await MedicalRecord.aggregate([
            { $match: { patientId } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $group: { _id: null, total: { $sum: '$count' }, categories: { $push: { category: '$_id', count: '$count' } } } }
        ]);

        const result = stats[0] || { total: 0, categories: [] };

        // NOTE: this still lowercases/kebab-cases category names for the
        // response keys (e.g. REPORT -> "report") while MyRecordsPage.jsx's
        // upload form and record display use the raw uppercase enum values
        // directly. If your stats cards read stats.byCategory.REPORT (or
        // similar) they'll still miss — worth deciding one convention
        // (recommend: keep the raw enum values as keys, no transformation)
        // rather than transforming here.
        res.json({
            success: true,
            data: {
                totalRecords: result.total,
                byCategory: Object.fromEntries(
                    result.categories.map(cat => [cat.category, cat.count])
                )
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecordsForDoctor = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const { page = 1, limit = 20, category, search } = req.query;

        const filter = {
            'access.doctors': doctorId,
            'access.expiresAt': { $gt: new Date() }
        };

        if (category) filter.category = category;
        if (search) filter.title = { $regex: search, $options: 'i' };

        const records = await MedicalRecord.find(filter)
            .populate({ path: 'patientId', select: 'fullname email phone', model: 'User' })
            .populate('uploadedBy', 'fullname')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await MedicalRecord.countDocuments(filter);

        // Removed the stats aggregation that grouped by `$status` —
        // MedicalRecord has no status field anywhere in the schema, so
        // `ready`/`processing` always resolved to 0. If you want an
        // upload-processing-status feature (useful if you ever add
        // async virus-scanning/OCR), add a real `status` field to the
        // model first, then this can be reintroduced correctly.
        res.json({
            success: true,
            records,
            stats: { total },
            pagination: { current: parseInt(page), pages: Math.ceil(total / limit), total }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecordDetails = async (req, res) => {
    try {
        const { recordId } = req.params;
        const doctorId = req.user._id;

        const record = await MedicalRecord.findOne({
            _id: recordId,
            'access.doctors': doctorId
        })
            .populate({ path: 'patientId', select: 'fullname email phone', model: 'User' })
            .populate('uploadedBy', 'fullname');

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};