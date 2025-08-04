import { HTTP_STATUS_CODES } from "@/features/common/constants";
import customError from "@/features/common/helpers/errors";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type ValidateRequestParams = {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
};

const validateRequest = (schema: ValidateRequestParams) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (schema.body) {
      const { error, value } = schema.body.validate(req.body);
      if (error) {
        const message = error.details.map((detail) => detail.message).join(", ");
        return next(
          customError({
            code: HTTP_STATUS_CODES.BAD_REQUEST,
            name: "Invalid request body",
            message,
          })
        );
      }
      req.body = value;
    }
    if (schema.query) {
      const { error, value } = schema.query.validate(req.query);
      if (error) {
        const message = error.details[0].message;
        return next(
          customError({
            code: HTTP_STATUS_CODES.BAD_REQUEST,
            name: "Invalid request query",
            message,
          })
        );
      }
      req.query = value;
    }
    if (schema.params) {
      const { error, value } = schema.params.validate(req.params);
      if (error) {
        const message = error.details[0].message;
        return next(
          customError({
            code: HTTP_STATUS_CODES.BAD_REQUEST,
            name: "Invalid request params",
            message,
          })
        );
      }
      req.params = value;
    }
    next();
  };
};

export default validateRequest;
