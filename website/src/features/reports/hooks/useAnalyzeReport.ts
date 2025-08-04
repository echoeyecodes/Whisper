import { useMutation, useQueryClient } from "@tanstack/react-query";
import reportService from "../services";

export const useAnalyzeReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportService.analyze,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "fetch-reports",
      });
    },
  });
};
