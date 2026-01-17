import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import checkupRoute from "./routes/checkup.route.js";

const app = express();

app.use(
	cors({
		origin: "https://kunban-board-five.vercel.app",
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	console.log("Headers:", req.headers);
	next();
});

app.use("/", checkupRoute);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
