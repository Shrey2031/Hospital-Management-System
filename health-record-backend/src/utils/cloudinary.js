// import {v2 as cloudinary} from 'cloudinary';
// import fs from 'fs';

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


// const uploadOnCloudinary =  async( localFilePath) => {
//     try{
//       if( !localFilePath ) return null;
//       //upload file on cloudinary 
//       const responce = await cloudinary.uploader.upload(localFilePath, {
//         resource_type: 'auto'
//       })
//       // file uploaded successfully
//       // console.log("uploaded file on cloudinary :",responce.url)

//       fs.unlinkSync(localFilePath)
//       return responce;
        
//     }catch (error) {
//         fs.unlinkSync(localFilePath) //remove locally  save temporary file as the upload operation got failed;
//         return null;
//     }

// }


// export {uploadOnCloudinary}


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// The original called fs.unlinkSync(localFilePath) directly in both the
// success path and the catch block. If the file didn't exist (already
// removed, or never fully written), unlinkSync throws ENOENT — and that
// throw wasn't caught anywhere, so it became an unhandled exception at
// the call site even though callers treat a `null` return as "handled
// failure." Centralizing cleanup here so it can never throw upward.
const safeUnlink = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (unlinkError) {
    console.error('Failed to remove local file:', filePath, unlinkError);
  }
};

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    safeUnlink(localFilePath);
    return response;
  } catch (error) {
    // Previously swallowed silently — failed uploads were indistinguishable
    // from "no file provided" from the logs alone.
    console.error('Cloudinary upload failed:', error?.message || error);
    safeUnlink(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };