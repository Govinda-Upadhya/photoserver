import { base_url } from "../index.js";
import fs from "fs/promises";
export const userUpload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const relativePath = req.file.path.replace("uploads/", "");
  const fileUrl = `${base_url}/api/photo/photos/${relativePath}`;
  res.json({ message: "File uploaded successfully!", url: fileUrl });
};

export const userUploadDelete = async (req, res) => {
  const { url } = req.body;
  const parts = url.split("/");
  const [username, filename] = parts.slice(-2);
  const main = `uploads/${username}/${filename}`;

  try {
    await fs.unlink(main);

    return res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    return res.status(400).json({ msg: "couldnt delete the image", err: err });
  }
};
