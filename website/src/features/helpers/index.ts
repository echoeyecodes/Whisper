import { formatDistanceToNow } from "date-fns";

export const formatRelativeDate = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
