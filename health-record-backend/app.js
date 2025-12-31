import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

// app.use(cors({
//    origin:process.env.CORS_ORIGIN,
//    credentials:true
// }))

app.use(cors({
    // origin:'https://hospital-management-system-xzid.vercel.app',
    origin:'http://localhost:5173',
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

//route declaration
app.use('/api/v1',userRoutes)
app.use('/api/v1', doctorRoutes)
app.use('/api/v1', facilityRoutes)
app.use('/api/v1', recordRoutes)
app.use('/api/v1', appointmentRoutes)


export { app }