export class CustomError extends Error {
  name: string;
  code?: number;
  constructor(message: string, name: string, code?: number) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

const customError = (params: {
  name: string;
  message: string;
  code?: number;
}) => {
  const error: CustomError = Error(params.message);
  error.name = params.name;
  error.code = params.code;
  return error;
};

export default customError;
