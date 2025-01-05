import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import { mongoConnect } from "./utils/connection.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import { checkUserAuthenticationCookie } from "./middlewares/authentication.js";
import { Blog } from "./models/blog.js";

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect(process.env.DB_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkUserAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
	const allBlogs = await Blog.find({});
	res.render("home", {
		user: req.user,
		blogs: allBlogs,
	});
});
app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(PORT);
