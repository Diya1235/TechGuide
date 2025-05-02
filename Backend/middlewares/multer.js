import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory as buffer

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB)
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("application/pdf")) {
            return cb(new Error("Only image and PDF files are allowed!"), false);
        }
        cb(null, true);
    },
});

// Define expected fields
export const uploadFields = upload.fields([
    { name: "profilepic", maxCount: 1 }, // Profile Picture
    { name: "resume", maxCount: 1 } // Resume
]);
