import { apiClient } from "@/config/apiConfig";
import { IUser } from "@/lib/types/Users";

export const getUsers = async (page: number) => {
  const response = await apiClient.get<IUser[]>(
    `/users?_page=${page}&_limit=3`
  );
  const total = response.headers["x-total-count"];

  return { users: [...response.data], total: total };
};
