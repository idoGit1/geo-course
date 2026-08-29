import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { useAuthUser } from "../auth/useAuthUser";
import { FetchUnitResponse } from "./appApi.types";

export const useUnit = (slug: string) => {
  const { data: user } = useAuthUser();

  return useQuery({
    queryKey: ["unit", slug],
    queryFn: async () => {
      const query = qs.stringify(
        {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          fields: [
            "slug",
            "title",
            "subtitle",
            "description",
            "iconName",
            "number",
            "scale",
          ],
          populate: {
            readingParts: {
              populate: {
                tags: true,
              },
            },
            videos: true,
            assignments: {
              populate: {
                questions: {
                  populate: {
                    options: true,
                  },
                },
              },
            },
          },
        },
        { encodeValuesOnly: true },
      );

      const response = await axios.get<{ data: FetchUnitResponse[] }>(
        `${import.meta.env.VITE_STRAPI_URL}/api/units?${query}`,
        {
          withCredentials: true,
        },
      );
      return response.data.data[0];
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });
};
