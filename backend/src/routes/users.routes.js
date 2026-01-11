import express from "express";
import { getUsers } from "../controllers/users.controller";

const router = express.Router();

router.post("/users", getUsers);

export default router;
