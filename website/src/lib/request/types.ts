export type PaginatedResponse<T> = {
  data: T[];
  metadata?: {
    cursor?: string;
  };
};
