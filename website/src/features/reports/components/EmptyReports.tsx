"use client";

import { DocumentIcon } from "@heroicons/react/24/outline";

const EmptyReports = () => {
  return (
    <div className="w-full bg-white border-gray-200 shadow-sm">
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <DocumentIcon />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            No reports found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            There are no reports available at the moment. Reports will appear
            here once they are generated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyReports;
