import { Difficulty } from "../../types";

export interface FetchMetadataResponse {
  siteName: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FetchUnitResponse {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string | null;
  number: number;
  scale: string | null;
  videos: FetchUnitResponseVideo[];
  readingParts: FetchUnitResponseReadingPart[];
  assignments: FetchUnitResponseAssignment[];
}

export interface FetchUnitResponseVideo {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
}

export interface FetchUnitResponseReadingPart {
  id: number;
  title: string;
  description: string | null;
  content: string;
  tags: {
    value: string;
  }[];
}

export interface FetchUnitResponseAssignment {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  questions: FetchUnitResponseAssignmentQuestion[];
  isSubmitted: boolean;
}

export interface FetchUnitResponseAssignmentQuestion {
  id: number;
  text: string;
  type: "closed" | "open";
  options: FetchUnitResponseAssignmentQuestionOption[] | null;
  score?: number;
  possiblePoints: number;
}

export interface FetchUnitResponseAssignmentQuestionOption {
  id: string;
  text: string;
}

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
