import { Router } from "express";

import {
	createNewBlog,
	createUserComment,
	viewBlogById,
} from "../controllers/blog.js";
import { upload } from "../utils/upload.js";

const router = Router();

router.get("/add-new", (req, res) => {
	res.render("blog", { user: req.user });
});

router.post("/", upload.single("coverImageUrl"), createNewBlog);
router.get("/:id", viewBlogById);

router.post("/comment/:id", createUserComment);

export default router;
