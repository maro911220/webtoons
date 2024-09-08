"use client";
import "@/style/pages/home.scss";
import Card from "./(components)/(home)/card";
import List from "./(components)/(home)/list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultStore } from "@/store/store";

const queryClient = new QueryClient();

export default function Page() {
  const toonWeb = defaultStore((state) => state.toonWeb);

  return (
    <>
      <h1 className="hidden">홈</h1>
      {/* Hero section */}
      <section className="home-hero">
        <h2 className="hidden">홈 배너</h2>
        <div className="home-con">
          {toonWeb.map((item, index) => (
            <Card title={item} key={index} />
          ))}
        </div>
      </section>
      {/* New Toon section */}
      <section className="home-update">
        <QueryClientProvider client={queryClient}>
          <div className="home-con">
            <h2 className="home-con-title">최근 업데이트</h2>
            <List />
          </div>
        </QueryClientProvider>
      </section>
    </>
  );
}
