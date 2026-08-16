import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FetchHomePageResponse } from "./types/fetchHomePageResponse"

export const useHomePage = () => {
    return useQuery({
        queryKey: ['homePage'],
        queryFn: async () => {
            const response = await axios.get<FetchHomePageResponse>(`${import.meta.env.VITE_STRAPI_URL}/api/home-page?populate=units`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
                },
            });
            return response.data;
        },
        staleTime: Infinity,
    })
}