import express from "express";
import { getTasks, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.delete("/:id", deleteTask);

export default router;
