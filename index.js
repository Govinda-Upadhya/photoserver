import e from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import { adminMiddleware } from "./auth.js";
const app = e();
const base_url = "http://localhost:3002/";
app.use(e.json({ limit: "50mb" }));
app.use("/photos", e.static("uploads"));
app.use(e.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(adminMiddleware);
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const fileUrl = `${base_url}/photos/${req.file.filename}`;

  res.json({
    message: "File uploaded successfully!",
    url: fileUrl,
  });
});

app.post("/uploads", upload.array("files", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const fileUrls = req.files.map(
    (file) => `${base_url}/photos/${file.filename}`
  );

  res.json({
    message: "Files uploaded successfully!",
    urls: fileUrls,
  });
});

app.listen(3002, () => console.log("listening.."));
