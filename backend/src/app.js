import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import checkupRoute from "./routes/checkup.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/",checkupRoute)
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
