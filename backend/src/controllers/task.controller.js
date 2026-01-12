import { readDB, writeDB } from "../utils/readWriteJson.js";

export const getTasks = (req, res) => {
	try {
		console.log("GET /api/tasks - Request received");
		const db = readDB();
		console.log("Database read successfully, tasks:");
		res.json(db.tasks);
	} catch (error) {
		console.error("Error in getTasks:", error.message);
		res
			.status(500)
			.json({ message: "Failed to fetch tasks", error: error.message });
	}
};

export const deleteTask = (req, res) => {
	try {
		const { id } = req.params;
		console.log("DELETE /api/tasks/" + id + " - Request received");
		const db = readDB();
		console.log("Database read successfully, tasks:");

		const taskIndex = db?.tasks?.findIndex((wannaBe) => wannaBe.id === id);
		console.log("The task index we want to delete " + taskIndex);

		if (taskIndex === -1) {
			return res.status(404).json({ message: "Task not found" });
		}

		db.tasks.splice(taskIndex, 1);
		console.log("deleted from db ");
		writeDB(db);

		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		console.error("Error in deleteTask:", error.message);
		res
			.status(500)
			.json({ message: "Failed to delete task", error: error.message });
	}
};

export const createTask = (req, res) => {
	try {
		console.log("POST /api/tasks - Request received");
		const db = readDB();
		console.log("Database read successfully, tasks:");
		const newTask = {
			id: crypto.randomUUID(),
			...req.body,
			startTime: new Date().toLocaleTimeString(),
		};

		db.tasks?.push(newTask);
		console.log("Task pushed successfully");
		writeDB(db);

		res.status(201).json(newTask);
	} catch (error) {
		console.error("Error in createTask:", error.message);
		res
			.status(500)
			.json({ message: "Failed to create task", error: error.message });
	}
};

export const updateTask = (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		console.log(`PATCH /api/tasks/${id} - Request received`);

		const db = readDB();

		const taskIndex = db.tasks.findIndex((task) => task.id === id);

		if (taskIndex === -1) {
			console.log(`Task with id ${id} not found`);
			return res.status(404).json({ message: "Task not found" });
		}

		const updatedTask = {
			...db.tasks[taskIndex],
			...updates,
		};

		db.tasks[taskIndex] = updatedTask;
		writeDB(db);

		console.log("Task updated successfully");

		res.json(updatedTask);
	} catch (error) {
		console.error("Error in updateTask:", error.message);
		res
			.status(500)
			.json({ message: "Failed to update task", error: error.message });
	}
};
