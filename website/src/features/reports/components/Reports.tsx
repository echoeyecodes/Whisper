"use client";

import { Report } from "@/features/reports/types";
import { cn } from "@/lib/utils";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type ReportsContextType = {
  selectedData: Report | null;
  setSelectedData: (data: Report) => void;
};

const ReportsContext = createContext<ReportsContextType>({
  selectedData: null,
  setSelectedData: () => {},
});

const Reports = ({ children }: PropsWithChildren) => {
  const [selectedData, setSelectedData] = useState<Report | null>(null);

  return (
    <ReportsContext.Provider value={{ selectedData, setSelectedData }}>
      <div className="flex flex-col bg-gray-50 md:flex-row md:min-h-screen">
        {children}
      </div>
    </ReportsContext.Provider>
  );
};

const Item = ({ children, data }: PropsWithChildren<{ data: Report }>) => {
  const context = useContext(ReportsContext);
  if (!context) throw new Error("Item must be used within ReportsContext");

  const { selectedData, setSelectedData } = context;
  const isSelected = selectedData?.id === data.id;

  return (
    <div
      onClick={() => setSelectedData(data)}
      className={cn(
        "p-4 border-b border-gray-200 cursor-pointer transition-all duration-200",
        isSelected ? "bg-blue-100 border-blue-300 shadow-sm" : "bg-white",
        "hover:bg-blue-50 hover:border-blue-200"
      )}
    >
      {children}
    </div>
  );
};

const List = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full md:w-1/3 min-w-80 bg-white border-r border-gray-200 shadow-sm">
      <div className="md:max-h-[calc(100vh-80px)] md:overflow-y-auto">{children}</div>
    </div>
  );
};

const Detail = ({
  children,
}: {
  children: (data: Report) => React.ReactNode;
}) => {
  const context = useContext(ReportsContext);
  if (!context) throw new Error("Detail must be used within ReportsContext");

  const { selectedData } = context;

  return (
    <div className="flex-1 bg-white">
      {selectedData ? (
        <div className="p-6">{children(selectedData)}</div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <DocumentIcon />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No item selected
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Select an item from the list to view details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

Reports.Item = Item;
Reports.Detail = Detail;
Reports.List = List;

export default Reports;
