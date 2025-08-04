"use client";

import ReportError from "@/features/reports/components/ReportError";
import { ReportsDetail } from "@/features/reports/components/ReportsDetail";
import ReportsListSkeleton from "@/features/reports/components/ReportsListSkeleton";
import { useFetchReport } from "@/features/reports/hooks/useFetchReport";
import { useParams } from "next/navigation";

export default function ReportDetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchReport(id as string);
  if (error) {
    return <ReportError message={error.message} />;
  }
  if (isLoading) {
    return <ReportsListSkeleton />;
  }
  if (!data) {
    return <ReportError message="Report not found" />;
  }
  return (
    <div className="px-6 py-6">
      
      <ReportsDetail data={data} />
    </div>
  );
}
