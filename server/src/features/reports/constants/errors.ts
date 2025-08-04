import customError from "@/features/common/helpers/errors";

export const REPORT_ERROR_NAMES = {
  CONTENT_NOT_FOUND: "CONTENT_NOT_FOUND",
  AUDIO_FILE_NOT_FOUND: "AUDIO_FILE_NOT_FOUND",
  REPORT_NOT_FOUND: "REPORT_NOT_FOUND",
};
export const REPORT_ERROR_MESSAGES = {
  [REPORT_ERROR_NAMES.CONTENT_NOT_FOUND]: "Content not found",
  [REPORT_ERROR_NAMES.AUDIO_FILE_NOT_FOUND]: "Audio file not found",
  [REPORT_ERROR_NAMES.REPORT_NOT_FOUND]: "Report not found",
};

export const contentNotFoundError = () =>
  customError({
    name: REPORT_ERROR_NAMES.CONTENT_NOT_FOUND,
    message: REPORT_ERROR_MESSAGES[REPORT_ERROR_NAMES.CONTENT_NOT_FOUND],
  });

export const audioFileNotFoundError = () =>
  customError({
    name: REPORT_ERROR_NAMES.AUDIO_FILE_NOT_FOUND,
    message: REPORT_ERROR_MESSAGES[REPORT_ERROR_NAMES.AUDIO_FILE_NOT_FOUND],
  });

export const reportNotFoundError = () =>
  customError({
    name: REPORT_ERROR_NAMES.REPORT_NOT_FOUND,
    message: REPORT_ERROR_MESSAGES[REPORT_ERROR_NAMES.REPORT_NOT_FOUND],
  });
