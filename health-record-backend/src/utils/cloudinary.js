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

import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Allowed file types for medical records
const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/webp',
    'application/pdf', 'image/tiff'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const uploadOnCloudinary = async (localFilePath, options = {}) => {
    try {
        // 🔒 Validate file exists
        if (!localFilePath || !fs.existsSync(localFilePath)) {
            throw new Error('File path is invalid or file does not exist');
        }

        // 📏 Get file stats
        const stats = fs.statSync(localFilePath);
        const fileSizeInBytes = stats.size;

        // 🔍 Validate file size
        if (fileSizeInBytes > MAX_FILE_SIZE) {
            fs.unlinkSync(localFilePath);
            throw new Error(`File size too large. Max 10MB allowed.`);
        }

        // 📁 Create organized folder structure
        const timestamp = new Date().toISOString().slice(0, 10);
        const folder = options.folder || `medical-records/${timestamp}`;

        // 🛡️ Cloudinary upload with medical-record optimizations
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: folder,
            // 🔒 Security
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'tiff'],
            // 📱 Responsive images
            quality: 'auto',
            fetch_format: 'auto',
            // 🗂️ Medical record specific
            overwrite: true,
            unique_filename: true,
            // 📊 Analytics
            notification_url: process.env.CLOUDINARY_NOTIFICATION_URL || undefined,
            // Custom options
            ...options
        });

        console.log(`✅ Uploaded: ${response.secure_url}`);

        // 🧹 Clean up local file
        safeUnlink(localFilePath);

        return {
            success: true,
            url: response.secure_url,
            public_id: response.public_id,
            resource_type: response.resource_type,
            format: response.format,
            size: response.bytes,
            metadata: {
                original_filename: path.basename(localFilePath),
                uploaded_at: new Date()
            }
        };

    } catch (error) {
        console.error('❌ Cloudinary upload failed:', error.message);
        
        // 🧹 Always clean up on error
        if (fs.existsSync(localFilePath)) {
            safeUnlink(localFilePath);
        }

        return {
            success: false,
            error: error.message,
            code: error.http_code || 'UPLOAD_FAILED'
        };
    }
};

// 🛡️ Safe file deletion
const safeUnlink = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (unlinkError) {
        console.warn('⚠️ Failed to delete local file:', unlinkError.message);
    }
};

// 🔍 Generate thumbnail for images
const generateThumbnail = async (publicId) => {
    try {
        const result = await cloudinary.api.create_transformation({
            public_id: publicId,
            transformation: [
                { width: 300, height: 300, crop: 'fill', quality: 'auto:low' },
                { effect: 'sepia' }
            ]
        });
        return result;
    } catch (error) {
        console.error('Thumbnail generation failed:', error);
        return null;
    }
};

export { 
    uploadOnCloudinary, 
    generateThumbnail,
    ALLOWED_TYPES,
    MAX_FILE_SIZE 
};
