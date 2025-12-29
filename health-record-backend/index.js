// import express from 'express';
import dotenv from 'dotenv';

import connectDB from './src/db/connect.js'
import { app } from './app.js';


// connectDB();


// app.get('/',(req,resp) => {
//     resp.send("app is running successfully")
// })

const PORT = process.env.PORT || 3000;
// const PORT = 3000;
// app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));


// dotenv.config();
// import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); 




// console.log('MONGO_URI:', process.env.MONGO_URI);  // Debugging line

connectDB()
.then(() => {
   app.listen( PORT, () => {
          console.log(`server is running at port: ${PORT}`);
   })
})
.catch((err) => {
    console.log("mongodb connection failed : !!",err)
})