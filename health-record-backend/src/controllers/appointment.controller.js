import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponce.js";
import { Appointment } from "../models/appointment.models.js";
import { User } from "../models/users.models.js";

const postAppointment = asyncHandler(async (req,resp,next) => {
    
    const {fullName,
        email,
        phone,
        age,
        gender,
        title,
        doctor_Name, 
         hasVisited,
         department,
         appointment_date} = req.body;
    
 
    if(
        !fullName ||
        !email ||
        !age ||
        !gender ||
        !title ||
        !doctor_Name ||
        !department ||
        !appointment_date||
        !phone
    ){
              throw new ApiError (400,"all fields are mandatory")
    }
 
     const isConflict = await User.find({
        fullname: doctor_Name,
        role: 'doctor',
        specialization: department,

     })
    
    if (!isConflict) {
    return next(new ApiError("Doctor not found", 404));
  }
//   if (isConflict.length > 1) {
//     return next(
//       new ApiError(
//         "Doctors Conflict! Please Contact Through Email Or Phone!",
//         400
//       )
//     );
//   }



  const appointment = await Appointment.create({
    fullName,
    email,
    phone,
    age,
    gender,
    title,
    status: "upcoming",
    doctor: { Name: doctor_Name },
    hasVisited,
    department,
    appointment_date,
    doctorId: req.user._id,
    
    facilityId: isConflict[0]?.facilityId || null,
  })
        
    return resp.status(201).json(
        new ApiResponse(200,appointment,"appointment created successfully")
     )
 

 })

//  const getAppointment = asyncHandler(async (req, res) => {

//   const appointment = req.user;
//   res.status(200).json({
//     success: true,
//     appointment,
//   });
// });

 const getAppointment = asyncHandler(async (req, res) => {
    const userId = req.user._id;

  const appointments = await Appointment.find({
    doctorId: userId // OR patientId if you have it
  }).sort({ createdAt: -1 });
    

  res.status(200).json(
    new ApiResponse(
      200,
       appointments ,
      "Fetched user appointments"
    )
  );
});


  const getAllAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
 });

const updateAppointmentStatus = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ApiError("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);
 const deleteAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ApiError("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});

export {
     postAppointment,
      getAllAppointments, 
      updateAppointmentStatus,
       deleteAppointment,
      getAppointment };