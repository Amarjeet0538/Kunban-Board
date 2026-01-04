import { readDB } from "../utils/readWriteJson.js";

export const getTasks = (req, res) => {
  const db = readDB();
  res.json(db.tasks);
};
