import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Kunbun backend is running Freaking HELL !!!");
});

export default router;
