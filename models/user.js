import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { genrateUserToken } from "../utils/auth.js";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		salt: {
			type: String,
			// required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profileImageUrl: {
			type: String,
			default:
				"https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg",
		},
		role: {
			type: String,
			enum: ["ADMIN", "USER"],
			default: "USER",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return;

	const salt = randomBytes(16).toString();

	const hashedPassword = createHmac("sha256", salt)
		.update(user.password)
		.digest("hex");

	this.salt = salt;
	this.password = hashedPassword;
	next();
});

userSchema.static(
	"matchPasswordAndGenrateToken",
	async function (email, password) {
		const user = await this.findOne({ email });
		if (!user) return null;

		const salt = user.salt;

		const hashedPassword = user.password;

		const userProvidedPassword = createHmac("sha256", salt)
			.update(password)
			.digest("hex");

		if (hashedPassword !== userProvidedPassword)
			throw new Error("Invalid credentials");

		const token = genrateUserToken(user);
		return token;
	}
);

export const User = model("User", userSchema);
