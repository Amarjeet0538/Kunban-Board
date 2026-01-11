import { readDB } from "../utils/readWriteJson.js";

export const getTasks = (req, res) => {
	try {
		console.log("GET /api/tasks - Request received");
		const db = readDB();
		console.log("Database read successfully, tasks:", db.tasks);
		res.json(db.tasks);
	} catch (error) {
		console.error("Error in getTasks:", error.message);
		res
			.status(500)
			.json({ message: "Failed to fetch tasks", error: error.message });
	}
};
