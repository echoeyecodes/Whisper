"use client";

import React, { useMemo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

type ReactQueryProviderProps = {
  children?: React.ReactNode;
};

export const getQueryClient = () => new QueryClient({});

export const ReactQueryProvider = (props: ReactQueryProviderProps) => {
  const queryClient = useMemo(() => getQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
