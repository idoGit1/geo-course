import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { useAuthUser } from "../auth/useAuthUser";
import { FetchMetadataResponse } from "./appApi.types";

export const useMetadata = () => {
  const { data: user } = useAuthUser();
  const query = qs.stringify(
    {
      fields: ["siteName", "title", "subtitle", "description"],
    },
    { encodeValuesOnly: true },
  );

  return useQuery({
    queryKey: ["metadata"],
    queryFn: async () => {
      const response = await axios.get<{ data: FetchMetadataResponse }>(
        `${import.meta.env.VITE_STRAPI_URL}/api/home-page?${query}`,
        {
          withCredentials: true,
        },
      );
      return response.data.data;
    },
    staleTime: Infinity,
    enabled: !!user,
  });
};
