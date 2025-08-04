import joi from "joi";

const getReports = {
  query: joi.object({
    filename: joi.string().optional(),
    score: joi.string().valid("low", "medium", "high").optional(),
  }),
};

const getReport = {
  params: joi.object({
    id: joi.string().required(),
  }),
};

const schema = {
  getReports,
  getReport,
};

export default schema;
