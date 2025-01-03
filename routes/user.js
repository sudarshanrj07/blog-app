import { Router } from "express";

const router = Router();

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.get("/signin", (req, res) => {
	res.render("signin");
});

router.post("/singup");

export default router;
