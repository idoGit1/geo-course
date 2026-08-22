import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FetchUnitsOverviewResponse } from "./types/FetchUnitsOverviewResponse";
import qs from "qs";

export const useUnitsOverview = () => {
  const query = qs.stringify(
    {
      fields: ["slug", "title", "subtitle", "iconName", "scale", "number"],
      populate: {
        readingParts: {
          fields: ["id"],
        },
        videos: {
          fields: ["id"],
        },
        assignments: {
          fields: ["id"],
        },
      },
    },
    { encodeValuesOnly: true },
  );

  return useQuery<FetchUnitsOverviewResponse[]>({
    queryKey: ["unitsOverview"],
    queryFn: async () => {
      const response = await axios.get<{ data: FetchUnitsOverviewResponse[] }>(
        `${import.meta.env.VITE_STRAPI_URL}/api/units?${query}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
          },
        },
      );
      return response.data.data;
    },
  });
};
