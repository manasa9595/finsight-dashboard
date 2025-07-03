import { db } from "../../firebase";

interface PaginatedFetchOptions {
  collectionName: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  defaultSortBy?: string;
}

export async function fetchPaginatedData<T>({
  collectionName,
  page = 1,
  limit = 10,
  sortBy,
  sortOrder = "desc",
  defaultSortBy = "createdAt",
}: PaginatedFetchOptions): Promise<{ data: T[]; totalElements: number }> {
  const offset = (page - 1) * limit;
  const orderField = sortBy || defaultSortBy;

  // Total count
  const countSnap = await db.collection(collectionName).count().get();
  const totalElements = countSnap.data().count;

  // Fetch paginated and sorted data
  const snapshot = await db
    .collection(collectionName)
    .orderBy(orderField, sortOrder)
    .offset(offset)
    .limit(limit)
    .get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];

  return { data, totalElements };
}
