"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ReportsListSkeleton = () => {
  return (
    <div className="w-full bg-white border-gray-200 shadow-sm">
      <div>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-4 border-b border-gray-200 bg-white">
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />

              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsListSkeleton;
