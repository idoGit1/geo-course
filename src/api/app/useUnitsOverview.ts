import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { useAuthUser } from "../auth/useAuthUser";
import { FetchUnitsOverviewResponse } from "./appApi.types";

export const useUnitsOverview = () => {
  const { data: user } = useAuthUser();
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
          withCredentials: true,
        },
      );
      return response.data.data;
    },
    enabled: !!user,
  });
};
