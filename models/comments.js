import { model, Schema } from "mongoose";

const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		blogId: {
			type: Schema.Types.ObjectId,
			ref: "Blog",
		},

		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export const Comments = model("Comment", commentSchema);
