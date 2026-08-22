import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";
import { FetchUnitResponse } from "./types/FetchUnitResponse";

export const useUnit = (slug: string) => {
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
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
          },
        },
      );
      return response.data.data[0];
    },
  });
};
