"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 1, // Only retry failed requests once
            refetchOnMount: true,
            // Add these optimizations to prevent cascade refetches
            refetchOnReconnect: false,
            gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
            // Prevent too many simultaneous requests
            networkMode: 'online',
          },
          mutations: {
            retry: 1,
            networkMode: 'online',
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
