"use client";
import Card from "./(components)/(home)/card";
import List from "./(components)/(home)/list";
import "@/style/pages/home.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const list = [
  { name: "NAVER", src: "/icon/logo_naver.png" },
  { name: "KAKAO", src: "/icon/logo_kakao.png" },
  { name: "KAKAO_PAGE", src: "/icon/logo_kakao_page.png" },
];

export default function Page() {
  return (
    <>
      {/* hero && search */}
      <section className="home-hero">
        <div className="home-con">
          {list.map((item, index) => (
            <Card src={item.src} title={item.name} key={index} />
          ))}
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
