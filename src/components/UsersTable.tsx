"use client";

import { getUsers } from "@/api/getUsers";
import { theme } from "@/styles/theme";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ErrorInfo } from "./ErrorInfo";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columns } from "@/lib/helpers/usersTableColumns";

export const UsersTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");

  const [page, setPage] = useState(queryPage ? +queryPage : 1);

  const { data, isLoading, isError } = useQuery(["users", page], () =>
    getUsers(page)
  );

  const handleRowClick = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    router.push(`?page=${page}`);
  };

  return (
    <Card
      sx={{
        mt: { xs: 0, md: 5 },
        py: { xs: 1, md: 2 },
        width: { md: "100%" },
      }}
    >
      <CardHeader title="Users list" sx={{ textAlign: "center" }} />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: theme.palette.primary.dark,
            }}
          />
        </Box>
      ) : isError ? (
        <ErrorInfo error="Oops. Something went wrong." />
      ) : (
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.field}
                        align={column.align}
                        sx={{ fontWeight: 700 }}
                      >
                        {column.headerName}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => handleRowClick(user.id)}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {user.name}
                    </TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.website}</TableCell>
                    <TableCell align="center">{user.address.city}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      )}
      <Pagination
        count={data && Math.ceil(data.total / 3)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      />
    </Card>
  );
};
