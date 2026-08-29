import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_STRAPI_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    queryClient.invalidateQueries({ queryKey: ["authUser"] });

    navigate("/login", { replace: true });
  };

  return logout;
};
