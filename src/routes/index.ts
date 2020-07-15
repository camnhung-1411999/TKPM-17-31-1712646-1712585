import express from "express";
import { authenticateAccessToken } from "../utils/jsonwebtoken";
const router = express.Router();
import productController from "../controllers/product.controller";
const fs = require("fs");
import multer from "multer";
var upload = multer({ dest: "uploads/" });

import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import cartRoutes from "./cart.routes";
import favoriteRoutes from "./favorite.routes";
router.get("/home", authenticateAccessToken, (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user,
  });
});
router.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user,
  });
});


router.get("/upload/newproduct", productController.upload);
router.post(
  "/upload/newproduct",
  upload.single("avatar"),
  productController.postUpload
);

router.use("/users", userRoutes);
router.use("/products", authenticateAccessToken, productRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/cart", authenticateAccessToken, cartRoutes);
router.use("/favorite",authenticateAccessToken, favoriteRoutes);

export default router;
