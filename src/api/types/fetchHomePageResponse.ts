export interface FetchHomePageResponse {
    siteName: string;
    title: string;
    subtitle: string;
    description: string;
    units: FetchHomePageResponseUnit[];
}

interface FetchHomePageResponseUnit {
    displayName: string;
    slug: string
}