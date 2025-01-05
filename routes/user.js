import { Router } from "express";
import { createUserHandler, loginUserHandler } from "../controllers/user.js";

const router = Router();

router
	.route("/signup")
	.get((req, res) => {
		res.render("signup");
	})
	.post(createUserHandler);

router
	.route("/signin")
	.get((req, res) => {
		res.render("signin");
	})
	.post(loginUserHandler);

router.get("/logout", (req, res) => {
	res.clearCookie("token").redirect("/");
});

export default router;
