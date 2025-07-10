import { Router } from "express";
import { fetchPaginatedData } from "../utils/paginatedTable";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    // const sortBy = req.query.sortBy as string;
    // const sortOrder =
    //   (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

    // const result = await fetchPaginatedData({
    //   collectionName: "pendingActions",
    //   page,
    //   limit,
    //   sortBy,
    //   sortOrder,
    //   defaultSortBy: "date",
    // });

    // res.json(result);
    const result = {
      data: [{ id: 1, message: "hello" }],
      total: 1,
      page: 1,
    };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
