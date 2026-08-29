import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "./auth.types";

export const useAuthUser = () => {
  return useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(
          `${import.meta.env.VITE_STRAPI_URL}/api/users/me?populate=role`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (_) {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
