import type { SvgIconComponent } from '@mui/icons-material';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  /** YouTube video id - swap in a real id, this is placeholder content */
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
  id: string;
  question: string;
  answer: string;
}

export type Difficulty = 'קל' | 'בינוני' | 'מאתגר';

export interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  questions: AssignmentQuestion[];
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
