import express from "express";
import {
  addbook,
  deletebook,
  getAllBooks,
  getsinglebook,
  updatebook,
} from "../functions/book.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary.js";

const router = express.Router();

// 🔧 Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bookstore", // your folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// 📘 Routes
router.post("/addbook", verifyAdminToken, upload.single("coverImage"), addbook);
router.post("/updatebook/:id", verifyAdminToken, upload.single("coverImage"), updatebook);
router.get("/", getAllBooks);
router.get("/:id", getsinglebook);
router.delete("/:id", verifyAdminToken, deletebook);

export default router;
