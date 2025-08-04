import openAi from "@/lib/ai";
import fs from "fs";
import path from "path";
import ReportModel from "../models";
import { contentNotFoundError } from "../constants/errors";
import { transformReport } from "../helpers";

type AnalyzeReportParams = {
  filename: string;
};

const getDuration = () => {
  return Math.random() * 1000;
};

const analyzeReport = async ({ filename }: AnalyzeReportParams) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "uploads",
    filename
  );
  const fileBuffer = fs.readFileSync(filePath);
  const file = new File([fileBuffer], filename, {
    type: "audio/mpeg",
  });
  const duration = getDuration();
  const transcription = await openAi.audio.transcriptions.create({
    file,
    model: "whisper-1",
  });

  const transcriptText = transcription.text;

  const prompt = `
You are a sales coach. Based on the following sales call transcript, provide:
- 3 strengths
- 3 areas for improvement
- A performance score between 1–10
- Return an empty array for strengths, weaknesses, and suggestions if you don't find any.

Transcript:
"${transcriptText}"

Format your response clearly under the headings and return it in JSON format of type { strengths: string[], weaknesses: string[], suggestions: string[], score: number, transcript: string, tags: string[] // Develop a tagging system for the report (e.g., "Needs Coaching", "Excellent") }:
**Strengths**
**Areas for Improvement**
**Score**
`;

  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const response = completion.choices[0].message.content;
  if (!response) throw contentNotFoundError();

  const { strengths, weaknesses, suggestions, score, transcript, tags } =
    JSON.parse(response);

  const report = await ReportModel.create({
    filename,
    transcript,
    strengths,
    weaknesses,
    suggestions,
    duration: Math.round(duration || 0),
    score,
    tags,
  })
    .then((report) => report.toJSON())
    .then(transformReport);

  return report;
};

export default analyzeReport;
