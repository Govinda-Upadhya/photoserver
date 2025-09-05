import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  adminUpload,
  adminUploadDelete,
  adminUploads,
} from "../Controllers/adminHandler.js";
import { adminMiddleware } from "../auth.js";

const adminUploadRoutes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.admin;
    if (!username) return cb(new Error("User not authenticated"), null);
    const dir = path.join("uploads", username);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

adminUploadRoutes.post(
  "/upload",
  adminMiddleware,
  upload.single("file"),
  adminUpload
);

adminUploadRoutes.post(
  "/uploads",
  adminMiddleware,
  upload.array("files", 5),
  adminUploads
);
adminUploadRoutes.delete("/delete", adminMiddleware, adminUploadDelete);

export default adminUploadRoutes;
