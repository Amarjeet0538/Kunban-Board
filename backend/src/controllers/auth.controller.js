import { readDB, writeDB } from "../utils/readWriteJson.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

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

	const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "7d",
	});
	res.json({ ...safeUser, token });
};

export const signup = (req, res) => {
	const db = readDB();
	
	 const existingUser = db.users.find(u => u.email === req.body.email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
	const newUser = {
		id: crypto.randomUUID(),
		...req.body,
	};

	db.users.push(newUser);
	writeDB(db);
	const token = jwt.sign(
		{ userId: newUser.id, email: newUser.email },
		JWT_SECRET,
		{ expiresIn: "7d" }
	);

	const { password: _, ...safeUser } = newUser;

	res.status(201).json({
		message: "User created",
		...safeUser,
		token,
	});
};
