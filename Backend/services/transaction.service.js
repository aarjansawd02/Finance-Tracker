import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";

export const getTransactions = async (userId) => {
  return await Transaction.find({ user: userId })
    .populate("category", "name type")
    .sort({ createdAt: -1 });
};

export const createTransaction = async (data) => {
  const { amount, type, description, date, category, user } = data;

  const transaction = await Transaction.create({
    amount,
    type,
    description,
    date,
    category,
    user,
  });

  return await transaction.populate("category", "name type");
};

export const updateTransaction = async (transactionId, userId, data) => {
  const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
  if (!transaction) return null;

  Object.assign(transaction, data);
  await transaction.save();
  return await transaction.populate("category", "name type");
};

export const deleteTransaction = async (transactionId, userId) => {
  return await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
};

export const getDashboardSummary = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const [summary, categoryBreakdown] = await Promise.all([
    Transaction.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]),
    Transaction.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: { category: "$category", type: "$type" }, total: { $sum: "$amount" } } },
      { $lookup: { from: "categories", localField: "_id.category", foreignField: "_id", as: "category" } },
      { $unwind: "$category" },
      { $project: { _id: 0, categoryId: "$category._id", categoryName: "$category.name", type: "$_id.type", total: 1 } },
      { $sort: { total: -1 } },
    ]),
  ]);

  let totalIncome = 0;
  let totalExpense = 0;
  summary.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  return { totalIncome, totalExpense, balance: totalIncome - totalExpense, categoryBreakdown };
};
