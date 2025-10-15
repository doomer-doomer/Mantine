'use client';

import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const theme = createTheme({});

export default function Providers({ children }: { children: React.ReactNode }) {
  // ✅ useState ensures QueryClient is created once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </MantineProvider>
  );
}
