import type { SvgIconComponent } from "@mui/icons-material";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
}

export interface ParagraphItem {
  id: string;
  title: string;
  content: string;
  keyTerms: string[];
}

export interface AssignmentQuestion {
  id: number;
  text: string;
  type: "closed" | "open";
  options: AssignmentQuestionOption[] | null;
  score?: number;
  possiblePoints: number;
}

export interface AssignmentQuestionOption {
  id: string;
  text: string;
}

export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export interface AssignmentItem {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  questions: AssignmentQuestion[];
  isSubmitted: boolean;
}

export interface Unit {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: SvgIconComponent;
  accent: string;
  scale: string; // decorative cartographic "map scale" label
  videos: VideoItem[];
  paragraphs: ParagraphItem[];
  assignments: AssignmentItem[];
}
