"use client";
import "@/style/pages/toon.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

export default function layouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1 className="hidden">홈</h1>
      {/* 웹툰 목록 섹션 */}
      <section className="toon">
        <h2 className="hidden">웹툰 목록</h2>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </section>
    </>
  );
}
