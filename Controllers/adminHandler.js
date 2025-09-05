import { base_url } from "../index.js";
import fs from "fs/promises";
export const adminUpload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const relativePath = req.file.path.replace("uploads/", "");
  const fileUrl = `${base_url}/photos/${relativePath}`;
  res.json({ message: "File uploaded successfully!", url: fileUrl });
};
export const adminUploads = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  const fileUrls = req.files.map((file) => {
    const relativePath = file.path.replace("uploads/", "");
    return `${base_url}/photos/${relativePath}`;
  });
  res.json({ message: "Files uploaded successfully!", urls: fileUrls });
};
export const handleSignupUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Ensure path exists and normalize slashes
  const filePath = req.file.path;
  const relativePath = filePath.replace(/\\/g, "/").replace(/^uploads\//, "");
  const fileUrl = `${base_url}/photos/${relativePath}`;

  res.json({
    message: "File uploaded successfully!",
    url: fileUrl,
    relativePath,
    filePath,
  });
};
export const adminUploadDelete = async (req, res) => {
  const { url } = req.body;
  const path = url.split("/").splice(4, 2);
  const main = `uploads/${path[0]}/${path[1]}`;

  try {
    await fs.unlink(main);

    return res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    return res.status(400).json({ msg: "couldnt delete the image" });
  }
};
