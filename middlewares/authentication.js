import { validateUserToken } from "../utils/auth.js";

export const checkUserAuthenticationCookie = (cookieName) => {
	return (req, res, next) => {
		const tokenCookieValue = req.cookies[cookieName];

		if (!tokenCookieValue) return next();

		try {
			const userPayload = validateUserToken(tokenCookieValue);
			req.user = userPayload;
		} catch (error) {}

		return next();
	};
};
