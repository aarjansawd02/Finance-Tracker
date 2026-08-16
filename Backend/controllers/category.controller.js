import * as categoryService from "../services/category.service.js";

export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const category = await categoryService.createCategory({
      name,
      type,
      user: req.user,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories(
      req.user
    );

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(
      req.params.id,
      req.user
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      category,
    });
  } catch (error) {
    console.error("Get category error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const category = await categoryService.updateCategory(
      req.params.id,
      req.user,
      {
        name,
        type,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(
      req.params.id,
      req.user
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};