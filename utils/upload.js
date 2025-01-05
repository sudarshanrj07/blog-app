import multer from "multer";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloud = async (url, id) => {
	const uploadResult = await cloudinary.uploader.upload(url, {
		folder: "blog_images",
		public_id: `${Date.now()} - ${id}`,
	});

	return uploadResult.secure_url;
};

export const upload = multer({
	storage: multer.diskStorage({}),
	limits: { fileSize: 10 * 1024 * 1024 }, //max 10MB
});
