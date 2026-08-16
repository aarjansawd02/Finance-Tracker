import * as transactionService from "../services/transaction.service.js";
import Category from "../models/category.model.js";

export const createTransaction = async (req, res) => {
  try {
    const { amount, type, description, date, category } = req.body;

    const existingCategory = await Category.findOne({ _id: category, user: req.user });
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (existingCategory.type !== type) {
      return res.status(400).json({ message: "Category type does not match transaction type" });
    }

    const transaction = await transactionService.createTransaction({
      amount, type, description, date, category, user: req.user,
    });

    res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    console.error("Create transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(req.user);
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactions(req.user);
    const found = transaction.find(t => t._id.toString() === req.params.id);
    if (!found) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ transaction: found });
  } catch (error) {
    console.error("Get transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { amount, type, description, date, category } = req.body;

    const existingCategory = await Category.findOne({ _id: category, user: req.user });
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (existingCategory.type !== type) {
      return res.status(400).json({ message: "Category type does not match transaction type" });
    }

    const transaction = await transactionService.updateTransaction(
      req.params.id, req.user, { amount, type, description, date, category }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    console.error("Update transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.deleteTransaction(req.params.id, req.user);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete transaction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
