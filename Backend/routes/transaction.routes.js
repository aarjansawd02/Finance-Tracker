import express from "express";

import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  transactionValidator,
} from "../validators/transaction.validator.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  transactionValidator,
  validate,
  createTransaction
);

router.get("/", getTransactions);

router.get("/:id", getTransaction);

router.put(
  "/:id",
  transactionValidator,
  validate,
  updateTransaction
);

router.delete("/:id", deleteTransaction);

export default router;