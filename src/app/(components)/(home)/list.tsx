/* eslint-disable @next/next/no-img-element */

"use client";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../loading";
import "@/style/components/home/list.scss";

// 로드 아이템 수, url
const ROWS_PER_PAGE = 20;
const url = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons`;

export default function List() {
  const { ref, inView } = useInView({ threshold: 0 });

  // fetch 함수
  const fetchPage = async (pageParam: number) => {
    const response = await axios.get(url, {
      params: { perPage: ROWS_PER_PAGE, isUpdated: true, page: pageParam },
    });
    return response.data.webtoons;
  };

  // Infinite Query 설정
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["webtoon"],
      queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === ROWS_PER_PAGE
          ? allPages.length + 1
          : undefined;
      },
    });

  // 무한 스크롤 inView 사용
  useEffect(() => {
    if (inView && !isLoading && hasNextPage) fetchNextPage();
  }, [inView, isLoading, fetchNextPage, hasNextPage]);

  // Loading & Error 처리
  if (isLoading) return <Loading size={72} />;
  if (error)
    return <p className="text-center">정보를 불러오는데 실패했습니다.</p>;

  // 웹툰 리스트 렌더링
  return (
    <div className="list">
      <AnimatePresence>
        {data?.pages.flat().map((web, index) => (
          <motion.a className="list-item" href={web.url} key={index}>
            <img
              src={web.thumbnail[0]}
              alt={web.title}
              width={100}
              height={100}
            />
            <span>{web.title}</span>
          </motion.a>
        ))}
      </AnimatePresence>
      <div
        className="absolute w-full left-0 bottom-0 text-center mx-auto py-6"
        ref={ref}
      >
        {hasNextPage ? <Loading size={32} /> : <p>마지막 입니다.</p>}
      </div>
    </div>
  );
}
