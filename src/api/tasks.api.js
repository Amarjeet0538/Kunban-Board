import { BACKEND_URL } from "../utils/constants";

export const fetchTasks = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");
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
