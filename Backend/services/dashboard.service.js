import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";

export const getDashboardSummary = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const [summary, categoryBreakdown] = await Promise.all([
    Transaction.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    Transaction.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
            type: "$type",
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id.category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          categoryId: "$category._id",
          categoryName: "$category.name",
          type: "$_id.type",
          total: 1,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]),
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  summary.forEach((item) => {
    if (item._id === "income") {
      totalIncome = item.total;
    }

    if (item._id === "expense") {
      totalExpense = item.total;
    }
  });

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
    categoryBreakdown,
  };
};