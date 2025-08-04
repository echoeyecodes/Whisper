import { makeRequest } from "@/lib/request/make-request";
import { Report } from "../types";

export type GetReportsParams = {
  query: {
    filename?: string;
    score?: string;
  };
};

const getReports = async ({ query }: GetReportsParams) => {
  const { data } = await makeRequest({
    path: `/v1/reports`,
    method: "GET",
    query,
  });
  return data.data as Report[];
};

export const getReport = async ({ id }: { id: string }) => {
  const { data } = await makeRequest({
    path: `/v1/reports/${id}`,
    method: "GET",
  });
  return data.data as Report;
};

const analyze = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await makeRequest({
    path: `/v1/reports`,
    method: "POST",
    body: formData,
  });
  return data.data as Report;
};

const reportService = {
  analyze,
  getReports,
  getReport,
};

export default reportService;
