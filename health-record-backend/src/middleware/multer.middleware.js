// import multer  from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  
//  export const upload = multer(
//     {  storage 

//     })


// export const singleUpload = upload.single('file'); // 👈 FIELD NAME = 'file'

import multer from "multer";
import path from "path";
import crypto from "crypto";
import { ApiError } from "../utils/apiError.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        // Was: cb(null, file.originalname) — used the raw, fully
        // client-controlled original filename as the actual disk path
        // segment. Two real problems: (1) two uploads sharing the same
        // original name (very plausible — "report.pdf", "prescription.jpg")
        // silently overwrite each other in ./public/temp; (2) originalname
        // isn't sanitized at all, so a crafted filename containing
        // path-traversal sequences could attempt to write outside the temp
        // directory. The original name is never used as a filesystem path
        // now — your controller can still store it for display if needed
        // (record.title already comes from the form, not from this file).
        const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
        const safeExt = path.extname(file.originalname).replace(/[^a-zA-Z0-9.]/g, '');
        cb(null, `${uniqueSuffix}${safeExt}`);
    }
});

// No size limit or file-type restriction existed at the multer level. The
// frontend's <input accept="image/*,.pdf"> is a UI hint only — it provides
// zero enforcement against a direct API call (Postman, curl, etc.).
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeValid = allowedTypes.test(file.mimetype);

    if (extValid && mimeValid) {
        return cb(null, true);
    }
    cb(new ApiError(400, "Only image and PDF files are allowed"));
};

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB — adjust if your records need larger files
    fileFilter
});

export const singleUpload = upload.single('file'); // 👈 FIELD NAME = 'file'