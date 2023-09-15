import { apiClient } from "@/config/apiConfig";
import { IPost } from "@/lib/types/Posts";

export const getUserPosts = async (userId: number, { pageParam = 1 }) => {
  const response = await apiClient.get<IPost[]>(
    `/users/${userId}/posts?_page=${pageParam}&_limit=3`
  );
  const total = response.headers["x-total-count"];

  return { posts: [...response.data], total: total, nextCursor: pageParam + 1 };
};
