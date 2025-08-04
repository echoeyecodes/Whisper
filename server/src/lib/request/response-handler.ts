import { Response } from "express";

const responseHandler: (data: {
  res: Response;
  status: number;
}) => (data: any) => Response =
  ({ res, status }: { res: Response; status: number }) =>
  (data: any) => {
    const response = data?.data ? data.data : data;
    const metadata = data?.metadata;

    return res.status(status).json({
      data: response,
      ...(metadata && { metadata }),
    });
  };

export default responseHandler;
