import { BACKEND_URL } from "../utils/constants";

export const fetchUsers = async () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const res = await fetch(`${BACKEND_URL}/api/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user?.token}`,
		},
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch Users");
	}

	return res.json();
};
