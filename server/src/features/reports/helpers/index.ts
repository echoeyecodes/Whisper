import { REPORTS_UPLOADS_DIR } from "../constants";
import { Report } from "../types";

export const transformReport = (report: Report) => {
  return {
    ...report,
    path: `${REPORTS_UPLOADS_DIR}/${report.filename}`,
  };
};
