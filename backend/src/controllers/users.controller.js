import { readDB } from "../utils/readWriteJson.js";

export const getUsers = (req, res) => {
  const db = readDB();

  const safeUsers = db.users.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    role: u.role
  }));

  res.json(safeUsers);
};
