"use client";

import "@/style/pages/toon.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function layouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="toon">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </section>
  );
}
