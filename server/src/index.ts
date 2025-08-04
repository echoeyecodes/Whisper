import express from "express";
import http from "http";
import reportsRoutes from "./features/reports/api";
import envConfig from "./lib/env";
import cors from "cors";
import resourceManager from "./lib/resource-manager";
import { database } from "./lib/resource-manager/resources";
import { REPORT_ERROR_NAMES } from "./features/reports/constants/errors";
import { HTTP_STATUS_CODES } from "./features/common/constants";
import setErrorStatus from "./lib/request/set-error-status";
import expressError from "./lib/request/express-error";
import { REPORTS_UPLOADS_DIR } from "./features/reports/constants";

const app = express();

const ERROR_MAPS = {
  [REPORT_ERROR_NAMES.CONTENT_NOT_FOUND]: HTTP_STATUS_CODES.NOT_FOUND,
  [REPORT_ERROR_NAMES.AUDIO_FILE_NOT_FOUND]: HTTP_STATUS_CODES.BAD_REQUEST,
  [REPORT_ERROR_NAMES.REPORT_NOT_FOUND]: HTTP_STATUS_CODES.NOT_FOUND,
};

app.use(cors());

app.use("/v1/reports", reportsRoutes);
app.use(`/${REPORTS_UPLOADS_DIR}`, express.static(REPORTS_UPLOADS_DIR));

app.use(setErrorStatus(ERROR_MAPS));
app.use(expressError.errorHandler);

const PORT = envConfig.get("API_PORT") ?? 3000;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  resourceManager.start({
    resources: [database()],
    onReady: async () => {},
  });
});
