import { useQuery } from "@tanstack/react-query";
import reportService from "../services";
import { REPORTS_QUERY_KEYS } from "@/features/constants/query-keys";
import { GetReportsParams } from "../services";

export const useFetchReports = (params: GetReportsParams) => {
  return useQuery({
    queryKey: REPORTS_QUERY_KEYS.FETCH_REPORTS(params),
    queryFn: () => reportService.getReports(params),
  });
};
