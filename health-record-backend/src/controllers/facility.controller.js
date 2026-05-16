import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponce.js";
import { FacilityProfile } from "../models/FacilityProfile.js";
import { DoctorProfile } from "../models/doctorProfile.model.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const getFacilityProfile = async (req, res) => {
    try {
        const facility = await FacilityProfile.findOne({ userId: req.user._id })
            .populate('doctors', 'fullName specialization consultationFee')
            .select('-__v');

        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        res.json({
            success: true,
            facility
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUpdateFacilityProfile = async (req, res) => {
    try {
        const { name, type, address, licenseNumber, services } = req.body;
        const logoFile = req.file; // From multer

        let facility = await FacilityProfile.findOne({ userId: req.user._id });

        // 🖼️ Handle logo upload
        let logoUrl = facility?.logo;
        if (logoFile) {
            const uploadResult = await uploadOnCloudinary(logoFile.path, {
                folder: `facilities/${req.user._id}/logo`
            });
            if (uploadResult.success) {
                logoUrl = uploadResult.url;
            }
        }

        if (facility) {
            // Update
            facility.name = name || facility.name;
            facility.type = type || facility.type;
            facility.address = address || facility.address;
            facility.licenseNumber = licenseNumber || facility.licenseNumber;
            facility.services = services || facility.services;
            facility.logo = logoUrl;
        } else {
            // Create
            facility = new FacilityProfile({
                userId: req.user._id,
                name,
                type,
                address,
                licenseNumber,
                services,
                logo: logoUrl
            });
        }

        const savedFacility = await facility.save();
        await savedFacility.populate('doctors', 'fullName specialization');

        res.json({
            success: true,
            message: 'Facility profile saved successfully',
            facility: savedFacility
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addDoctorToFacility = async (req, res) => {
    try {
        const { doctorId } = req.body;

        // Verify doctor exists
        const doctor = await DoctorProfile.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Get facility
        const facility = await FacilityProfile.findOne({ userId: req.user._id });
        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        // Add doctor to facility
        doctor.facilityId = facility._id;
        facility.doctors.push(doctorId);

        await doctor.save();
        await facility.save();

        await facility.populate('doctors', 'fullName specialization');

        res.json({
            success: true,
            message: 'Doctor added to facility successfully',
            facility
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeDoctorFromFacility = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const facility = await FacilityProfile.findOne({ userId: req.user._id });
        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        // Remove from facility doctors array
        facility.doctors = facility.doctors.filter(id => id.toString() !== doctorId);
        
        // Clear doctor's facility
        await DoctorProfile.findByIdAndUpdate(doctorId, { facilityId: null });

        await facility.save();

        res.json({
            success: true,
            message: 'Doctor removed from facility',
            facility
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFacilityStats = async (req, res) => {
    try {
        const facility = await FacilityProfile.findOne({ userId: req.user._id })
            .populate('doctors', 'fullName');

        const stats = {
            totalDoctors: facility.doctors.length,
            services: facility.services.length,
            rating: facility.rating || 0,
            isVerified: facility.isVerified
        };

        res.json({
            success: true,
            stats,
            facility
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllFacilityDoctors = async (req, res) => {
    try {
        const facility = await FacilityProfile.findOne({ userId: req.user._id })
            .populate('doctors', 'fullName specialization consultationFee availability');

        res.json({
            success: true,
            doctors: facility.doctors || []
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};