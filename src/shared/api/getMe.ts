import { useQuery } from "@tanstack/react-query";
import type { User } from "src/shared/types";
import { api } from "./api";

export const useGetMe = () => {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return null;
      const { data } = await api.get<User>("/user/me");
      return data;
    },
    retry: false,
  });
};

