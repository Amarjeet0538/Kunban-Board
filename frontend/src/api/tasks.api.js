import { BACKEND_URL } from "../utils/constants";

export const fetchTasks = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const res = await fetch(`${BACKEND_URL}/api/tasks`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user?.token}`,
		},
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch tasks");
	}

	return res.json();
};

export const createTask = async (taskData) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");

	const res = await fetch(`${BACKEND_URL}/api/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token || user?.token}`,
		},
		credentials: "include",
		body: JSON.stringify(taskData),
	});

	if (!res.ok) {
		throw new Error("Failed to create task");
	}

	return res.json();
};

export const deleteTasks = async (taskId) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");

	const res = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user?.token}`,
		},
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to delete task");
	}

	return res.json();
};

export const updateTasks = async (taskId, updatedFields) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");

	const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user?.token}`,
		},
		body: JSON.stringify(updatedFields),
	});

	if (!response.ok) {
		throw new Error("Failed to update task");
	}

	return await response.json();
};
