import * as dashboardService from "../services/dashboard.service.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getDashboardSummary(
      req.user
    );

    res.status(200).json(summary);
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};