import {BACKEND_URL} from "../utils/constants"

export const loginUser = async (data) => {
	const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
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

// TODO : add signup
export const signupUser = async(data) =>{

}


