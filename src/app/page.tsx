"use client";
import Card from "./(components)/(home)/card";
import List from "./(components)/(home)/list";
import "@/style/pages/home.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Page() {
  // sample

  return (
    <>
      {/* hero && search */}
      <section className="home-hero">
        <div className="home-con">
          <Card url="/icon/logo_naver.png" title="Naver" />
          <Card url="/icon/logo_kakao.png" title="kakao" />
          <Card url="/icon/logo_kakao_page.png" title="Kakao Page" />
        </div>
      </section>
      {/* new card */}
      <section className="home-update">
        <QueryClientProvider client={queryClient}>
          <div className="home-con">
            <List />
          </div>
        </QueryClientProvider>
      </section>
    </>
  );
}
