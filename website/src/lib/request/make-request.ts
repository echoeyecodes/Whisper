/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_URL } from "./constants";
import ErrorBody from "./ErrorBody";
import objectToQueryParams from "./object-to-query";
type RequestType = "GET" | "POST" | "PUT" | "DELETE";
export type RequestConfig = {
  cache?: RequestCache;
  next_request_config: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type RequestParams = {
  path: string;
  body?: BodyInit;
  method?: RequestType;
  headers?: any;
  query?: object;
  request_config?: RequestConfig;
};

export async function makeRequest(params: RequestParams) {
  const url = `${BASE_API_URL}/${
    params.path.startsWith("/") ? params.path.slice(1) : params.path
  }${objectToQueryParams(params.query ?? {})}`;

  try {
    const response = await fetch(url, {
      method: params.method ?? "GET",
      headers: {
        ...params.headers,
      },
      cache: params.request_config?.cache ?? "no-cache",
      next: params.request_config?.next_request_config,
      body: params.body,
    });
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => {
        throw new ErrorBody(
          response.status,
          response.statusText,
          "UNEXPECTED_ERROR"
        );
      });
      throw new ErrorBody(
        errorResponse.code ?? response.status,
        errorResponse.message ?? response.statusText,
        errorResponse.name ?? "UNEXPECTED_ERROR"
      );
    }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    throw error;
  }
}
