import JWT from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const genrateUserToken = (user) => {
	const payload = {
		_id: user._id,
		email: user.email,
		profileImageUrl: user.profileImageUrl,
		role: user.role,
	};

	const token = JWT.sign(payload, secret);

	return token;
};

export const validateUserToken = (token) => {
	const payload = JWT.verify(token, secret);
	return payload;
};
