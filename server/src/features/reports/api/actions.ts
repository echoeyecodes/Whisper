import { NextFunction, Request, Response } from "express";
import responseHandler from "@/lib/request/response-handler";
import { HTTP_STATUS_CODES } from "@/features/common/constants";
import reportService from "../service";
import { audioFileNotFoundError } from "../constants/errors";

const processAudioFile = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(audioFileNotFoundError());
  }
  const filename = req.file.filename;
  return reportService
    .analyzeReport({ filename })
    .then(responseHandler({ res, status: HTTP_STATUS_CODES.OK }))
    .catch(next);
};

const getReports = async (req: Request, res: Response, next: NextFunction) => {
  return reportService
    .getReports(req.query)
    .then(responseHandler({ res, status: HTTP_STATUS_CODES.OK }))
    .catch(next);
};

const getReport = async (req: Request, res: Response, next: NextFunction) => {
  return reportService
    .getReportById({
      id: req.params.id,
    })
    .then(responseHandler({ res, status: HTTP_STATUS_CODES.OK }))
    .catch(next);
};

const actions = {
  processAudioFile,
  getReports,
  getReport,
};

export default actions;
