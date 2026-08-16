import { body } from "express-validator";

export const categoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 50 })
    .withMessage("Category name cannot exceed 50 characters"),

  body("type")
    .notEmpty()
    .withMessage("Category type is required")
    .isIn(["income", "expense"])
    .withMessage("Category type must be income or expense"),
];