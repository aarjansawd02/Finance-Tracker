import express from "express";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { categoryValidator } from "../validators/category.validator.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  categoryValidator,
  validate,
  createCategory
);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put(
  "/:id",
  categoryValidator,
  validate,
  updateCategory
);

router.delete("/:id", deleteCategory);

export default router;