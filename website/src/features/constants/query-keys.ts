import { GetReportsParams } from "../reports/services";

export const REPORTS_QUERY_KEYS = {
  FETCH_REPORTS: (params: GetReportsParams) => ["fetch-reports", params.query],
  FETCH_REPORT: (id: string) => ["fetch-report", id],
};
