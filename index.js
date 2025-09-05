import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminUploadRoutes from "./Routes/admin.js";
import { userUpload } from "./Controllers/userHandler.js";
import { userUploadRouter } from "./Routes/user.js";

const app = e();
export const base_url = "https://www.thanggo.com";

app.use(
  cors({
    origin: ["https://www.thanggo.com", "https://thanggo.com"],
    credentials: true,
  })
);
app.use(e.json({ limit: "50mb" }));
app.use("/photos", e.static("uploads"));
app.use(e.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/user", userUploadRouter);
app.use("/admin", adminUploadRoutes);

app.listen(3002, () => console.log("listening.."));
