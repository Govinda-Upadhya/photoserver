import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminUploadRoutes from "./Routes/admin.js";

const app = e();
export const base_url = "http://localhost:3002";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(e.json({ limit: "50mb" }));
app.use("/photos", e.static("uploads"));
app.use(e.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/admin", adminUploadRoutes);

app.listen(3002, () => console.log("listening.."));
