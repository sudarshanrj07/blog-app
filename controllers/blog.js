import { Blog } from "../models/blog.js";
import { Comments } from "../models/comments.js";
import { cloud } from "../utils/upload.js";

export const createNewBlog = async (req, res) => {
	const { title, body } = req.body;

	const filePath = req.file.path;

	const coverImageUrl = await cloud(filePath, req.user._id);

	const blog = await Blog.create({
		title: title,
		body: body,
		coverImageUrl,
		createdBy: req.user,
	});

	return res.redirect(`/api/blog/${blog._id}`);
};

export const viewBlogById = async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate("createdBy");
	const comments = await Comments.find({ blogId: req.params.id }).populate(
		"userId"
	);
	if (!blog) return res.send({ msg: "Vlog cant be displayed" });
	res.render("showBlog", {
		user: req.user,
		blog,
		comments,
	});
};

export const createUserComment = async (req, res) => {
	await Comments.create({
		content: req.body.content,
		blogId: req.params.id,
		userId: req.user._id,
	});

	return res.redirect(`/api/blog/${req.params.id}`);
};
