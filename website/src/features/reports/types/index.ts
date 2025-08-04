export type Report = {
  id: string;
  filename: string;
  transcript: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  duration: number;
  tags: string[];
  path: string;
  score: number;
  created_at: Date;
  updated_at: Date;
};
