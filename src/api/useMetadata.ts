import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FetchMetadataResponse } from "./types/FetchMetadataResponse";
import qs from "qs";

export const useMetadata = () => {
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
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
          },
        },
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });
};
