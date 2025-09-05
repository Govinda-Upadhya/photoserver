import { Router } from "express";
import { userUpload, userUploadDelete } from "../Controllers/userHandler.js";
import fs from "fs";
import path from "path";
import multer from "multer";

export const userUploadRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join("uploads", "user");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

userUploadRouter.post("/upload", upload.single("file"), userUpload);
userUploadRouter.delete("/delete", upload.single("file"), userUploadDelete);
