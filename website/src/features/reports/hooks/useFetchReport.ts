import { useQuery } from "@tanstack/react-query";
import reportService from "../services";
import { REPORTS_QUERY_KEYS } from "@/features/constants/query-keys";

export const useFetchReport = (id: string) => {
  return useQuery({
    queryKey: REPORTS_QUERY_KEYS.FETCH_REPORT(id),
    queryFn: () => reportService.getReport({ id }),
  });
};
