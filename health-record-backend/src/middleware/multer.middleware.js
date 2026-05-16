import multer  from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer(
    {  storage 

    })

// import multer from "multer";
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public/temp')); // Fixed path
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname); // Added unique prefix
//     }
// });

// // 👇 THIS IS THE KEY FIX - Specify the EXPECTED FIELD NAME
// export const upload = multer({ 
//     storage,
//     limits: {
//         fileSize: 50 * 1024 * 1024 // 50MB limit
//     },
//     fileFilter: (req, file, cb) => {
//         // Allow only specific file types
//         const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedTypes.test(file.mimetype);

//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only PDF, JPG, PNG, DOC, DOCX files are allowed'));
//         }
//     }
// });

// 👇 EXPORT SINGLE FILE UPLOAD MIDDLEWARE
export const singleUpload = upload.single('file'); // 👈 FIELD NAME = 'file'