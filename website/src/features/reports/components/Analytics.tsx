"use client";

import Reports from "@/features/reports/components/Reports";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  CloudArrowUpIcon,
  MusicalNoteIcon,
  PlayIcon,
  ClockIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useAnalyzeReport } from "@/features/reports/hooks/useAnalyzeReport";
import { z } from "zod";
import useFormWithValidator from "@/lib/react-form/useForm";
import { toast } from "sonner";
import { useFetchReports } from "@/features/reports/hooks/useFetchReports";
import { cn } from "@/lib/utils";
import ReportsListSkeleton from "@/features/reports/components/ReportsListSkeleton";
import EmptyReports from "@/features/reports/components/EmptyReports";
import { formatDuration, formatRelativeDate } from "@/features/helpers";
import { useRef } from "react";
import ReportError from "@/features/reports/components/ReportError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/features/common/hooks/useDebounce";
import { ReportsDetail } from "./ReportsDetail";
import Link from "next/link";
import { REPORTS_PAGE_ROUTES } from "@/features/constants/page-routes";

const fileUploadSchema = z.object({
  audioFile: z
    .instanceof(File, { message: "Please select a file" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB limit
      "File size must be less than 10MB"
    )
    .refine(
      (file) => file.type.startsWith("audio/"),
      "Please select an audio file (MP3, WAV, M4A, etc.)"
    )
    .refine((file) => {
      const allowedTypes = [
        "audio/mpeg",
        "audio/wav",
        "audio/mp4",
        "audio/aac",
        "audio/ogg",
        "audio/webm",
      ];
      return allowedTypes.includes(file.type);
    }, "Unsupported audio format. Please use MP3, WAV, M4A, AAC, OGG, or WebM"),
});

const filterSchema = z.object({
  filename: z.string().optional(),
  score: z.enum(["all", "high", "medium", "low"]),
});

type FileUploadForm = z.infer<typeof fileUploadSchema>;
type FilterForm = z.infer<typeof filterSchema>;

export default function Home() {
  const { mutate: analyzeReport, isPending: isUploading } = useAnalyzeReport();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useFormWithValidator<FileUploadForm>({
    schema: fileUploadSchema,
    defaultValues: {
      audioFile: undefined,
    },
  });

  const filterForm = useFormWithValidator<FilterForm>({
    schema: filterSchema,
    defaultValues: {
      filename: "",
      score: "all",
    },
  });

  const debouncedFilename = useDebounce(filterForm.watch("filename"), 300);
  const debouncedScore = useDebounce(filterForm.watch("score"), 300);

  const {
    data = [],
    isLoading,
    error,
    refetch: refetchReports,
  } = useFetchReports({
    query: {
      filename: debouncedFilename,
      score: debouncedScore === "all" ? undefined : debouncedScore,
    },
  });

  const onSubmit = async (data: FileUploadForm) => {
    console.log("Uploading file:", data.audioFile.name);
    analyzeReport(
      { file: data.audioFile },
      {
        onSuccess: () => {
          toast.success("File uploaded successfully!");
        },
        onError: (error) => {
          toast.error(`Upload failed: ${error.message}`);
        },
        onSettled: () => {
          form.reset();
        },
      }
    );
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    form.setValue("audioFile", file);

    const isValid = await form.trigger("audioFile");

    if (isValid) {
      onSubmit({ audioFile: file });
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleClearFilters = () => {
    filterForm.reset();
  };

  const onReportClick = (
    evt: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    evt.preventDefault();
    // This is intentional. I'm doing this to avoid full page reload and retain the expected url. when the page reloads, it will navigate to the report detail page.
    window.history.pushState(null, "", REPORTS_PAGE_ROUTES.REPORT_DETAIL(id));
  };

  return (
    <main>
      <Reports>
        <Reports.List>
          {/* Enhanced Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <SpeakerWaveIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Whisper AI</h1>
                <p className="text-sm text-gray-600">
                  Analyze your sales calls and get insights on your performance.
                </p>
              </div>
            </div>
          </div>

          {/* Upload CTA Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-indigo-50">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-primary-100">
                <MusicalNoteIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Analyze Your Sales Calls
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload audio files and get accurate transcriptions powered by
                AI.
              </p>

              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="audioFile"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="hidden"
                            ref={inputRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Upload button */}
                  <Button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CloudArrowUpIcon className="h-5 w-5" />
                        <span>Upload Audio File</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <PlayIcon className="h-4 w-4" />
                  <span>MP3, WAV, M4A</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>Up to 2 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2 mb-3">
              <FunnelIcon className="h-4 w-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">Filters</h3>
            </div>

            <Form {...filterForm}>
              <form className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <FormField
                      control={filterForm.control}
                      name="filename"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Filter by filename..."
                                {...field}
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={filterForm.control}
                      name="score"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Filter by score" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All scores</SelectItem>
                                <SelectItem value="high">
                                  High (80%+)
                                </SelectItem>
                                <SelectItem value="medium">
                                  Medium (60-79%)
                                </SelectItem>
                                <SelectItem value="low">
                                  Low (&lt;60%)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {(filterForm.watch("filename") ||
                    filterForm.watch("score")) && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleClearFilters}
                      className="whitespace-nowrap"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            {/* Results count */}
            <div className="mt-2 text-xs text-gray-500">
              Showing {data.length} of {data.length} reports
            </div>
          </div>

          {/* Enhanced items list */}
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Recent Reports
            </h3>
            {isLoading ? (
              <ReportsListSkeleton />
            ) : error ? (
              <ReportError message={error.message} onRetry={refetchReports} />
            ) : data.length === 0 ? (
              <EmptyReports />
            ) : (
              data.map((item) => (
                <Link
                  href={REPORTS_PAGE_ROUTES.REPORT_DETAIL(item.id)}
                  key={item.id}
                  onClick={(evt) => onReportClick(evt, item.id)}
                >
                  <Reports.Item data={item}>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.filename}
                          </p>
                          <div className="flex items-center space-x-1">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                Math.round((item.score / 10) * 100) >= 80
                                  ? "bg-green-500"
                                  : Math.round((item.score / 10) * 100) >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              )}
                            ></div>
                            <span className="text-xs text-gray-500">
                              {Math.round((item.score / 10) * 100)}%
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatRelativeDate(item.created_at)} •{" "}
                          {formatDuration(item.duration)} •{" "}
                          {item.transcript.length} chars
                        </p>
                      </div>
                    </div>
                  </Reports.Item>
                </Link>
              ))
            )}
          </div>
        </Reports.List>

        <Reports.Detail>
          {(data) => (
            <div className="h-full overflow-y-auto">
              <ReportsDetail data={data} />
            </div>
          )}
        </Reports.Detail>
      </Reports>
    </main>
  );
}
