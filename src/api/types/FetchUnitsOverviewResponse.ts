export interface FetchUnitsOverviewResponse {
  slug: string;
  title: string;
  subtitle: string | null;
  number: number;
  iconName: string;
  scale: string | null;
  readingParts: ContentId[];
  videos: ContentId[];
  assignments: ContentId[];
}

type ContentId = {
  id: number;
};
