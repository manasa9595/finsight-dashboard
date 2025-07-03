"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paginatedTable_1 = require("../utils/paginatedTable");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
        const result = await (0, paginatedTable_1.fetchPaginatedData)({
            collectionName: "profiles",
            page,
            limit,
            sortBy,
            sortOrder,
            defaultSortBy: "joinedAt",
        });
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
});
exports.default = router;
