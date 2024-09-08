/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../loading";
import "@/style/components/home/list.scss";

// 한 페이지에서 로드할 웹툰 개수 및 API URL
const ROWS_PER_PAGE = 20;
const API_URL = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons`;

export default function List() {
  // inView를 사용하여 요소가 보이는지 여부를 트래킹
  const { ref, inView } = useInView({ threshold: 0 });

  // 웹툰 데이터 페칭 함수
  const fetchPage = async (pageParam: number) => {
    const response = await axios.get(API_URL, {
      params: { perPage: ROWS_PER_PAGE, isUpdated: true, page: pageParam },
    });
    return response.data.webtoons;
  };

  // useInfiniteQuery를 통해 무한 스크롤 적용
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["webtoon"], // 쿼리 키
      queryFn: ({ pageParam = 1 }) => fetchPage(pageParam), // 페이지 넘버에 따라 데이터 페칭
      initialPageParam: 1, // 첫 페이지 설정
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지가 아이템으로 꽉 찼을 경우, 다음 페이지를 반환
        return lastPage.length === ROWS_PER_PAGE
          ? allPages.length + 1
          : undefined;
      },
    });

  // inView가 true일 경우 다음 페이지 로드
  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isLoading, fetchNextPage, hasNextPage]);

  // 로딩 중일 때 표시할 컴포넌트
  if (isLoading) return <Loading size={72} />;

  // 에러가 발생할 경우 표시할 메시지
  if (error)
    return <p className="text-center">정보를 불러오는데 실패했습니다.</p>;

  // 웹툰 리스트 렌더링
  return (
    <div className="list">
      <AnimatePresence>
        {data?.pages.flat().map((webtoon, index) => (
          <motion.a
            className="list-item"
            target="_blank"
            href={webtoon.url}
            key={index}
          >
            <img
              src={webtoon.thumbnail[0]}
              alt={webtoon.title}
              width={100}
              height={100}
            />
            <span>{webtoon.title}</span>
          </motion.a>
        ))}
      </AnimatePresence>
      {/* 스크롤이 끝날 때 로딩 표시 or 마지막 페이지 표시 */}
      <div
        className="absolute w-full left-0 bottom-0 text-center mx-auto py-6"
        ref={ref}
      >
        {hasNextPage ? <Loading size={32} /> : <p>마지막 입니다.</p>}
      </div>
    </div>
  );
}
