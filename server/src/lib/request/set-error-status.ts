import { HTTP_STATUS_CODES } from "@/features/common/constants";
import { CustomError } from "@/features/common/helpers/errors";
import { Request, Response, NextFunction } from "express";

const setErrorStatus =
  (errorMap: Record<string, number>) =>
  (error: CustomError, _: Request, res: Response, next: NextFunction) => {
    const status =
      error.code ??
      errorMap[error.name] ??
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message =
      status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        ? "Internal server error"
        : error.message ?? "Something went wrong. Please try again";

    if (status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
      console.log(error.message);
    }
    return res.status(status).json({
      status,
      name: error.name,
      message,
    });
  };

export default setErrorStatus;
