import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { useAuthUser } from "../auth/useAuthUser";
import { FetchUnitResponse } from "./appApi.types";

export const useUnits = (units: { slug: string }[] | undefined) => {
  const { data: user } = useAuthUser();
  useQueries({
    queries: (units ?? []).map((unit) => ({
      queryKey: ["unit", unit.slug],
      queryFn: async () => {
        const query = qs.stringify(
          {
            filters: { slug: { $eq: unit.slug } },
            fields: [
              "slug",
              "title",
              "subtitle",
              "description",
              "iconName",
              "number",
              "scale",
              "assignments",
            ],
            populate: {
              readingParts: { populate: { tags: true } },
              videos: true,
              assignments: {
                populate: {
                  questions: { populate: { options: true } },
                },
              },
            },
          },
          { encodeValuesOnly: true },
        );

        const response = await axios.get<{ data: FetchUnitResponse[] }>(
          `${import.meta.env.VITE_STRAPI_URL}/api/units?${query}`,
          { withCredentials: true },
        );
        return response.data.data[0];
      },
      enabled: !!user && !!units,
      staleTime: 5 * 60 * 1000,
    })),
  });
};
