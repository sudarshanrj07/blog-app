import { User } from "../models/user.js";

export const createUserHandler = (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) return res.render("signup");
	const newUser = User.create({
		name,
		email,
		password,
	});

	if (!newUser) return res.render("signup");
	res.redirect("/api/users");
};

export const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.matchPassword(email, password);

	if (!user) return res.render("signin");

	res.redirect("/api/users");
};
