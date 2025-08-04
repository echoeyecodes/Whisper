import ReportModel from "../models";
import { transformReport } from "../helpers";
import { Op } from "sequelize";

type GetReportsParams = {
  filename?: string;
  score?: string;
};

const getScoreQuery = (score: string) => {
  const scoreMap = {
    low: { score: { [Op.lte]: 30 } },
    medium: {
      score: {
        [Op.gte]: 31,
        [Op.lte]: 60,
      },
    },
    high: { score: { [Op.gt]: 60 } },
  };

  return scoreMap[score as keyof typeof scoreMap] || {};
};

const getReports = async (params: GetReportsParams) => {
  const { filename, score } = params;

  const scoreQuery = score ? getScoreQuery(score) : {};

  return ReportModel.findAll({
    where: {
      ...scoreQuery,
      ...(filename && { filename: { [Op.like]: `%${filename}%` } }),
    },
    order: [["created_at", "DESC"]],
  }).then((reports) =>
    reports.map((report) => report.toJSON()).map(transformReport)
  );
};

export default getReports;
