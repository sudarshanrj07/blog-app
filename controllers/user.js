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
	res.redirect("/");
};

export const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;

	try {
		const token = await User.matchPasswordAndGenrateToken(email, password);

		res.cookie("token", token).redirect("/");
	} catch (error) {
		res.render("signin", { error });
	}
};
