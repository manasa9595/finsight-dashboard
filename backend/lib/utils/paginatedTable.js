"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPaginatedData = fetchPaginatedData;
const firebase_1 = require("../firebase");
async function fetchPaginatedData({ collectionName, page = 1, limit = 10, sortBy, sortOrder = "desc", defaultSortBy = "createdAt", }) {
    const offset = (page - 1) * limit;
    const orderField = sortBy || defaultSortBy;
    // Total count
    const countSnap = await firebase_1.db.collection(collectionName).count().get();
    const totalElements = countSnap.data().count;
    // Fetch paginated and sorted data
    const snapshot = await firebase_1.db
        .collection(collectionName)
        .orderBy(orderField, sortOrder)
        .offset(offset)
        .limit(limit)
        .get();
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return { data, totalElements };
}
