import { readDB, writeDB } from "../utils/readWriteJson.js";
import crypto from "crypto";

export const login = (req, res) => {
	const { email, password } = req.body;
	const db = readDB();
	const user = db.users.find(
		(guy) => guy.email === email && guy.password === password
	);

	if (!user) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const { password: _, ...safeUser } = user;
	res.json(safeUser);
};

export const signup = (req, res) => {
	const db = readDB();

	const newUser = {
		id: crypto.randomUUID(),
		...req.body,
	};

	db.users.push(newUser);
	writeDB(db);

	res.status(201).json({ message: "User created" });
};
