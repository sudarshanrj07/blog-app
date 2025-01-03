import { Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";

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
			required: true,
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

export const User = mongoose.model("User", userSchema);
