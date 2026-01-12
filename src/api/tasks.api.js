import { BACKEND_URL } from "../utils/constants";
const user = JSON.parse(localStorage.getItem("user"));

export const fetchTasks = async () => {

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

export const addTasks = async () =>{
	const res = await fetch(`${BACKEND_URL}/api/tasks`,{

	})

	if (!res.ok) {
		throw new Error("Failed to add tasks");
	}

	return res.json();
}

export const deleteTasks = async(taskId) =>{
	const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

	const res = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`,{
		method:"DELETE",
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
}



export const updateTasks = async () => {


}
