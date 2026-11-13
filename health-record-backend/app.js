// import express from 'express';
// import cors from 'cors'
// import cookieParser from 'cookie-parser';



// const app = express();

// app.use(cors({
//     // origin:'https://hospital-management-system-xzid.vercel.app',
//      origin:process.env.CORS_ORIGIN||'http://localhost:5173',
//     methods:['GET','PUT','POST','DELETE'],
//     credentials:true
// }))

// app.use(express.json({limit:'12kb'}));
// app.use(express.urlencoded({extended:true,limit:'12kb'}));
// app.use(express.static('public'))
// app.use(cookieParser());


// // impport routes 
// import userRoutes from './src/routes/userRoutes.js'
// import doctorRoutes from './src/routes/doctorRoutes.js'
// import facilityRoutes from './src/routes/facilityRoutes.js'
// import recordRoutes from './src/routes/recordRoutes.js'
// import appointmentRoutes from './src/routes/appointmentRoutes.js'
// import prescriptionRoutes from './src/routes/prescriptionRoutes.js'
// import notificationRoutes from './src/routes/notificationRoutes.js'
// import messageRoutes from './src/routes/messageRoutes.js'

// //route declaration
// app.use('/api/v1/users',userRoutes)
// app.use('/api/v1/doctors', doctorRoutes)
// app.use('/api/v1/facilities', facilityRoutes)
// app.use('/api/v1/records', recordRoutes)
// app.use('/api/v1/appointments', appointmentRoutes)
// app.use('/api/v1/prescriptions', prescriptionRoutes)
// app.use('/api/v1/notifications', notificationRoutes)
// app.use('/api/v1/messages', messageRoutes)


// export { app }

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    // origin:'https://hospital-management-system-xzid.vercel.app',
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
}));

// Bumped from 12kb — that limit was tight enough to 413 on ordinary
// payloads (a longer address/notes field, a few nested objects). File
// uploads go through multipart/form-data (bypassing this limit entirely),
// so this only governs plain JSON bodies like login/register/appointment
// payloads. 1mb is a much safer default; tighten again if 12kb was
// deliberate (e.g. an abuse-prevention measure).
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// import routes
import userRoutes from './src/routes/userRoutes.js';
import doctorRoutes from './src/routes/doctorRoutes.js';
import facilityRoutes from './src/routes/facilityRoutes.js';
import recordRoutes from './src/routes/recordRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import prescriptionRoutes from './src/routes/prescriptionRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';

// route declaration
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/facilities', facilityRoutes);
app.use('/api/v1/records', recordRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/prescriptions', prescriptionRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/messages', messageRoutes);

// NOTE: no centralized error-handling middleware exists below this point.
// If your controllers throw (or call next(err)) without each one manually
// catching and formatting a JSON response, Express's default HTML error
// page gets sent back to a frontend that only expects JSON. I didn't add
// one here because I don't know if you already have an ApiError/
// errorHandler utility elsewhere in src/ — tell me and I'll either wire
// yours in here or add a minimal one that matches your existing response
// shape (you're already using an ApiResponse-style pattern based on the
// frontend's `res.data.data` accesses).

export { app };
