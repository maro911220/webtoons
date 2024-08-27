"use client";

import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import "@/style/components/home/list.scss";

const ROWS_PER_PAGE = 20; // 한 페이지당 불러올 상품개수

export default function List() {
  const { ref, inView } = useInView({ threshold: 0 });

  // API URL 및 fetch 함수
  const url = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons`;
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

  // 무한 스크롤을 위해 inView 사용
  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      console.log(hasNextPage);
      fetchNextPage();
    }
  }, [inView, isLoading, fetchNextPage]);

  // Loading & Error 처리
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>정보를 불러오는데 실패했습니다.</p>;

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
      <div className="absolute bottom-0 opacity-0" ref={ref}>
        <p>트리거에용</p>
      </div>
    </div>
  );
}
