import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';



const app = express();

app.use(cors({
    // origin:'https://hospital-management-system-xzid.vercel.app',
     origin:process.env.CORS_ORIGIN||'http://localhost:5173',
    methods:['GET','PUT','POST','DELETE'],
    credentials:true
}))

app.use(express.json({limit:'12kb'}));
app.use(express.urlencoded({extended:true,limit:'12kb'}));
app.use(express.static('public'))
app.use(cookieParser());


// impport routes 
import userRoutes from './src/routes/userRoutes.js'
import doctorRoutes from './src/routes/doctorRoutes.js'
import facilityRoutes from './src/routes/facilityRoutes.js'
import recordRoutes from './src/routes/recordRoutes.js'
import appointmentRoutes from './src/routes/appointmentRoutes.js'
import prescriptionRoutes from './src/routes/prescriptionRoutes.js'
import notificationRoutes from './src/routes/notificationRoutes.js'
import messageRoutes from './src/routes/messageRoutes.js'

//route declaration
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/doctors', doctorRoutes)
app.use('/api/v1/facilities', facilityRoutes)
app.use('/api/v1/records', recordRoutes)
app.use('/api/v1/appointments', appointmentRoutes)
app.use('/api/v1/prescriptions', prescriptionRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/messages', messageRoutes)


export { app }