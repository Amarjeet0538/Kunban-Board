import { BACKEND_URL } from "../utils/constants";

export const fetchTasks = async () => {
	const res = await fetch(`${BACKEND_URL}/api/tasks`);

	if (!res.ok) {
		throw new Error("Failed to fetch tasks");
	}
	return res.json();
};
