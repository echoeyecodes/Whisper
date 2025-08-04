export type Report = {
  id: string;
  filename: string;
  duration: number;
  transcript: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  tags: string[];
  score: number;
  created_at: Date;
  updated_at: Date;
};
