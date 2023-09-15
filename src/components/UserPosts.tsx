"use client";

import { getUserPosts } from "@/api/getUserPosts";
import { ErrorInfo } from "@/components/ErrorInfo";
import { theme } from "@/styles/theme";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const UserPosts = ({ userId }: { userId: number }) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["posts"],
      (pageParam) => getUserPosts(userId, pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const totalFetched =
            allPages.reduce((acc, page) => acc + page.posts.length, 0) || 0;
          if (lastPage.total <= totalFetched) {
            return false;
          }
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
        User no. {userId} posts
      </Typography>
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
        <InfiniteScroll
          dataLength={
            data?.pages.reduce((acc, page) => acc + page.posts.length, 0) || 0
          }
          next={fetchNextPage}
          hasMore={hasNextPage !== false}
          loader={
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Loading...
            </Typography>
          }
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.posts.map((post) => (
                <Card
                  elevation={3}
                  key={post.id}
                  sx={{
                    height: "30vh",
                    mb: 3,
                  }}
                >
                  <CardHeader title={post.title} sx={{ textAlign: "center" }} />
                  <CardContent>{post.body}</CardContent>
                </Card>
              ))}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default UserPosts;
