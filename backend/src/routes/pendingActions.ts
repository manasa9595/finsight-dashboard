import express from "express";
import { fetchPaginatedData } from "../utils/paginatedTable";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = req.query.sortBy as string;
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

    const result = await fetchPaginatedData({
      collectionName: "pendingActions",
      page,
      limit,
      sortBy,
      sortOrder,
      defaultSortBy: "date",
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching pending actions:", error);
    res.status(500).json({ error: "Failed to fetch pending actions" });
  }
});

export default router;
