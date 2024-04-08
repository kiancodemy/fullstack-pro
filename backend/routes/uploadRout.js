import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

function checkImageFileType(file) {
  // Get the file extension
  const extname = path.extname(file.originalname).toLowerCase();

  // Allowed image file extensions
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  // Check if the extension is included in the allowed extensions
  if (allowedExtensions.includes(extname)) {
    return true;
  } else {
    return false;
  }
}
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (checkImageFileType(file)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (JPEG, PNG, GIF) are allowed."));
    }
  },
});

router.post("/", upload.single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  res.send("File uploaded successfully.");
});

export default router;
