"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface ReportErrorProps {
  message: string;
  onRetry?: () => void;
}

const ReportError = ({ message, onRetry }: ReportErrorProps) => {
  return (
    <div className="w-full bg-white border-gray-200 shadow-sm">
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-red-500 mb-4">
            <ExclamationTriangleIcon />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mb-4">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportError;
