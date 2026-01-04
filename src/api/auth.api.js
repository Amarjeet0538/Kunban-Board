const BASE_URL = "http://localhost:5000";

export const loginUser = async (data) => {
	const res = await fetch(`${BASE_URL}/api/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || "Login failed");
	}

	return res.json();
};
