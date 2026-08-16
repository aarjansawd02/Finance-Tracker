import Category from "../models/category.model.js";

export const createCategory = async (data) => {
  return await Category.create(data);
};

export const getCategories = async (userId) => {
  return await Category.find({ user: userId }).sort({ createdAt: -1 });
};

export const getCategoryById = async (categoryId, userId) => {
  return await Category.findOne({
    _id: categoryId,
    user: userId,
  });
};

export const updateCategory = async (
  categoryId,
  userId,
  data
) => {
  return await Category.findOneAndUpdate(
    {
      _id: categoryId,
      user: userId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
};

export const deleteCategory = async (
  categoryId,
  userId
) => {
  return await Category.findOneAndDelete({
    _id: categoryId,
    user: userId,
  });
};