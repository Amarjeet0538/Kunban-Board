import fs from "fs";
import path from "path";

const DB_PATH = path.resolve("data/db.json");

export const readDB = () => {
	try {
		console.log(" Reading database from:", DB_PATH);
		if (!fs.existsSync(DB_PATH)) {
			console.error(" Database file not found at:", DB_PATH);
			const defaultData = { users: [], tasks: [] };
			fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
			fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
			return defaultData;
		}

		const data = fs.readFileSync(DB_PATH, "utf-8");
		return JSON.parse(data);
	} catch (error) {
		console.error(" Error reading database:", error.message);
		throw error;
	}
};

export const writeDB = (data) => {
	try {
		fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
	} catch (error) {
		console.error("Error writing database:", error.message);
		throw error;
	}
};
