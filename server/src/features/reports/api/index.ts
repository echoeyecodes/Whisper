import actions from "./actions";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { REPORTS_UPLOADS_DIR } from "../constants";
import validateRequest from "@/lib/request/validate-request";
import schema from "./req-schema";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const uploadsDir = REPORTS_UPLOADS_DIR;
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

router.post("/", upload.single("file"), actions.processAudioFile);
router.get("/", validateRequest(schema.getReports), actions.getReports);
router.get("/:id", validateRequest(schema.getReport), actions.getReport);

export default router;
