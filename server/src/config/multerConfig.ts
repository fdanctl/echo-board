import multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    const safeBase = baseName.replace(/[^a-zA-Z0-9-_]/g, "").substring(0, 50);
    const finalName = `${timestamp}-${safeBase}${ext}`;

    cb(null, finalName);
  },
});

const upload = multer({ storage });

export default upload;
