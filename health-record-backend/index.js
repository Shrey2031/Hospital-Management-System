// import express from 'express';
import dotenv from 'dotenv';

import connectDB from './src/db/connect.js'
import { app } from './app.js';



app.get('/',(req,resp) => {
    resp.send("app is running successfully")
})

const PORT = process.env.PORT || 3000;

dotenv.config({ path: './.env' }); 

connectDB()
.then(() => {
   app.listen( PORT, () => {
          console.log(`server is running at port: ${PORT}`);
   })
})
.catch((err) => {
    console.log("mongodb connection failed : !!",err)
})