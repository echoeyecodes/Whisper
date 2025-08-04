import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types";
import { HTTP_STATUS_CODES } from "@/features/common/constants";

export type CustomError = Error & {
  code?: number;
};

const setErrorStatus =
  (errorMap: { [key: string]: number }) =>
  (error: CustomError, _: Request, __: Response, next: NextFunction) => {
    const code = errorMap[error.name];
    if (!!code) {
      error.code = code;
    }
    return next(error);
  };

const errorHandler = (
  error: CustomError,
  req: AuthRequest,
  res: Response,
  __: NextFunction
) => {
  const code = error.code ?? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

  if ([HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR].includes(code)) {
    console.log(error);
  }

  return res.status(code).json({
    name: error.name,
    code,
    message:
      code === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        ? "Internal server error"
        : error.message,
  });
};

const expressError = {
  errorHandler,
  setErrorStatus,
};

export default expressError;
