import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/apiResponce.js";
import { Appointment } from "../models/appointment.models.js";
import { Prescription } from "../models/Prescription.model.js";
import { MedicalRecord } from "../models/medicalRecord.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'something went wrong while generating refresh and access token');
    }
};

const registerUser = asyncHandler(async (req, resp) => {
    const { fullname, username, email, password, phone, role } = req.body;

    // Was `field?.trim() === ""` — a field that's MISSING entirely (not
    // just empty) makes `field?.trim()` return undefined, and
    // `undefined === ""` is false, so a completely omitted password (say)
    // passed this check silently. `!field?.trim()` catches both cases.
    if ([fullname, username, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "all fields are mandatory");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        // Was "user with email and password already exist" — copy-paste typo.
        throw new ApiError(409, "user with email or username already exists");
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password,
        phone,
        role,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "user not found");
    }

    return resp.status(201).json(
        new ApiResponse(200, createdUser, "user register successfully")
    );
});

const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'email and password are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, 'user does not exist');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'invalid password');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return resp.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "user login Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, resp) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return resp.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user logged Out"));
});

const getUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, user, "User details fetched successfully")
    );
});

const getPatientStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const recordsCount = await MedicalRecord.countDocuments({ patientId: userId });

    const appointmentsCount = await Appointment.countDocuments({
        patientId: userId,
        status: { $in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
    });

    const prescriptionsCount = await Prescription.countDocuments({ patientId: userId });

    const labReportsCount = await MedicalRecord.countDocuments({
        patientId: userId,
        category: { $in: ['REPORT'] } // schema enum has no 'LAB' value — REPORT is the closest match
    });

    const doctorsCount = await Appointment.distinct('doctorId', { patientId: userId })
        .then(doctors => doctors.length);

    // Removed the $avg: '$rating' aggregation — Appointment has no `rating`
    // field anywhere in the schema, so this always silently resolved to 0.
    // No rating feature exists yet; add it back once one does.

    // Was filtering on a top-level `date` field — Appointment stores date
    // as `slot.date`, so this always matched 0 documents.
    const recentVisits = await Appointment.countDocuments({
        patientId: userId,
        'slot.date': { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    const stats = {
        recordsCount,
        labReportsCount,
        appointmentsCount,
        prescriptionsCount,
        doctorsCount,
        visitsCount: recentVisits
    };

    return res.status(200).json(
        new ApiResponse(200, stats, "Patient stats fetched successfully")
    );
});

const getPatientDoctors = asyncHandler(async (req, res) => {
    const patientId = req.user._id;

    const appointments = await Appointment.find({ patientId })
        .populate({
            path: 'doctorId',
            match: { role: 'doctor' },
            select: 'fullname specialty consultationFee avatar'
        })
        .sort({ createdAt: -1 });

    const doctorMap = new Map();
    appointments.forEach(appointment => {
        const doctor = appointment.doctorId;
        if (doctor) {
            const key = doctor._id.toString();
            if (!doctorMap.has(key)) {
                doctorMap.set(key, {
                    id: doctor._id,
                    fullName: doctor.fullname,
                    specialty: doctor.specialty || 'General',
                    consultationFee: doctor.consultationFee || 0,
                    avatar: doctor.avatar
                });
            }
        }
    });

    let doctors = Array.from(doctorMap.values());

    if (doctors.length === 0) {
        const fallbackDoctors = await User.find({ role: 'doctor', isActive: true })
            .select('fullname specialty consultationFee avatar')
            .limit(10);

        doctors = fallbackDoctors.map(doctor => ({
            id: doctor._id,
            fullName: doctor.fullname,
            specialty: doctor.specialty || 'General',
            consultationFee: doctor.consultationFee || 0,
            avatar: doctor.avatar
        }));
    }

    return res.status(200).json(
        new ApiResponse(200, { doctors, count: doctors.length }, "Doctors fetched successfully")
    );
});

export {
    registerUser,
    generateAccessAndRefreshToken,
    loginUser,
    logoutUser,
    getUserDetails,
    getPatientStats,
    getPatientDoctors
};

// fixBrokenAppointments was intentionally removed — it randomly assigned a
// doctor to any appointment with a null doctorId/patientId, including a
// hardcoded fallback patient ID. That's a one-time data-repair script, not
// something that should be a permanently reachable route. Run it as a
// standalone script against your DB if you still need it once, rather than
// exporting it as a controller.