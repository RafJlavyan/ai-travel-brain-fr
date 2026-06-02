import { api } from "./api";

export const useGetMe = async () => {
  const { data } = await api.get("/user/me");
  return data;
};
