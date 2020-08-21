import express from "express";
import { authenticateAccessToken} from "../utils/jsonwebtoken";
const router = express.Router();
import productController from "../controllers/product.controller";
const fs = require("fs");
import multer from "multer";
var upload = multer({ dest: "uploads/" });

import checkRole from "../utils/checkrole";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import cartRoutes from "./cart.routes";
import categoryRoutes from "./category.routes";
import favoriteRoutes from "./favorite.routes";
import billRoutes from './bill.routes';
import homeRoutes from "./home.routes";
import profileRoutes from "./profile.routes";
import adminProductRoutes from './adminProduct.routes'

import userController from '../controllers/user.controller';
import validation from '../utils/validation';
import check from '../utils/auth';



router.get("/upload/newproduct", authenticateAccessToken, productController.upload);
router.post(
  "/upload/newproduct",
  upload.single("avatar"),
  productController.postUpload
);

router.post(
  '/users',
  validation.user,
  check.User,
  userController.create,
);


router.use("/users",authenticateAccessToken,checkRole, userRoutes);
router.use('/admin/products',authenticateAccessToken,checkRole, adminProductRoutes);
router.use("/category",authenticateAccessToken,checkRole, categoryRoutes);
router.use("/products",authenticateAccessToken, productRoutes);
router.use("/auth", authRoutes);
router.use("/admin",authenticateAccessToken,checkRole, adminRoutes);
router.use("/cart", authenticateAccessToken, cartRoutes);
router.use("/favorite", authenticateAccessToken, favoriteRoutes);
router.use('/bill',authenticateAccessToken,checkRole, billRoutes);
router.use('/profile',authenticateAccessToken,profileRoutes);

router.use('/',homeRoutes);

export default router;
