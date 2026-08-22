import { Difficulty } from "../../types";

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

interface FetchUnitResponseVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
}

interface FetchUnitResponseReadingPart {
  id: string;
  title: string;
  description: string | null;
  content: string;
  tags: {
    value: string;
  }[];
}

interface FetchUnitResponseAssignment {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  questions: FetchUnitResponseAssignmentQuestion[];
}

interface FetchUnitResponseAssignmentQuestion {
  id: string;
  text: string;
  type: "closed" | "open";
  options: { text: string }[] | null;
}
