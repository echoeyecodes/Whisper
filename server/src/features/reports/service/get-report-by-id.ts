import ReportModel from "../models";
import { reportNotFoundError } from "../constants/errors";

type GetReportByIdParams = {
  id: string;
  filename?: string;
  score?: string;
};

const getReportById = async (params: GetReportByIdParams) => {
  const report = await ReportModel.findByPk(params.id);
  if (!report) throw reportNotFoundError();
  return report;
};

export default getReportById;
