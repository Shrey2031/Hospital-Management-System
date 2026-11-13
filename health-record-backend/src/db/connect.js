// const mongoose = require('mongoose');
// import mongoose  from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();


// const connectDB = async () => {
//   try {
//     const connectionInstant =  await mongoose.connect(`${process.env.MONGO_URI}`);
//     console.log(` \n MongoDB Connected !! ${connectionInstant.connection.host}`);

//   } catch (error) {
//       console.log('mongodb connection error : ',error);
//       process.exit(1)
//   }
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n MongoDB Connected !! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;