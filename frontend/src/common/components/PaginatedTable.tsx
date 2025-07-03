import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Loader from "./Loader";

export interface PaginatedTableProps<T> {
  endpoint: string;
  columns: {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
  }[];
  rowActions?: (item: T) => React.ReactNode;
  defaultSortBy?: keyof T;
  defaultSortOrder?: "asc" | "desc";
  rowsPerPageOptions?: number[];
}

function PaginatedTable<T extends { id: string }>({
  endpoint,
  columns,
  rowActions,
  defaultSortBy,
  defaultSortOrder = "desc",
  rowsPerPageOptions = [5, 10, 25],
}: PaginatedTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState<string>(defaultSortBy as string);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `${endpoint}?page=${page + 1}&limit=${rowsPerPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const res = await response.json();
        setData(res.data);
        setTotalElements(res.totalElements);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint, page, rowsPerPage, sortBy, sortOrder]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(0);
  };

  if (loading) return <Loader text="Loading data..." />;

  if (error)
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">Error loading data: {error}</Typography>
      </Box>
    );

  if (data.length === 0)
    return (
      <Box textAlign="center" py={4}>
        <Typography>No data found.</Typography>
      </Box>
    );

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 700,
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  onClick={() =>
                    col.sortable ? handleSort(col.key as string) : undefined
                  }
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                >
                  {col.label}
                  {sortBy === col.key && (sortOrder === "asc" ? " ↑" : " ↓")}
                </TableCell>
              ))}
              {rowActions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render ? col.render(item) : (item[col.key] as any)}
                  </TableCell>
                ))}
                {rowActions && <TableCell>{rowActions(item)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </>
  );
}

export default PaginatedTable;
