import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const login = async (email: string, password: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_STRAPI_URL}/api/auth/local`,
        {
          identifier: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      queryClient.refetchQueries({ queryKey: ["authUser"] });
      return true;
    } catch (error: any) {
      return false;
    }
  };

  return login;
};
