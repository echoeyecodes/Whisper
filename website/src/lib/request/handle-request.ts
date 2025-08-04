import { notFound } from "next/navigation";
import { errorHandler } from "./errorHandler";
import { HTTP_STATUS_CODES } from "@/features/common/constants";

type HandleRequestParams<T> = () => Promise<T>;

async function handleRequest<T>(cb: HandleRequestParams<T>): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    if (errorHandler(error).status === HTTP_STATUS_CODES.NOT_FOUND) {
      throw notFound();
    }
    throw error;
  }
}

export default handleRequest;
