"use client";
import axios from "axios";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/(components)/loading";
import ToonItem from "@/app/(components)/toonItem";

// API URL
const API_URL = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons";

export default function Page({ params }: any) {
  // 검색어를 URL 파라미터에서 가져와서 디코딩
  const keyword = decodeURI(params.id);

  return (
    <div className="toon-con">
      {/* 검색 결과 헤더 */}
      <div className="toon-con-header">
        <p className="toon-con-header__word">
          <b>&#39;{keyword}&#39;</b> 로 검색한 결과입니다.
        </p>
      </div>
      {/* 웹툰 리스트 컴포넌트 */}
      <ToonList keyword={keyword} />
    </div>
  );
}

// 웹툰 목록을 가져오는 컴포넌트
function ToonList({ keyword }: { keyword: string }) {
  // 웹툰 데이터를 가져오는 함수
  const fetchWebtoons = useCallback(async () => {
    const response = await axios.get(API_URL, {
      params: {
        perPage: 20,
        keyword: keyword,
      },
    });
    return response.data;
  }, [keyword]);

  // React Query를 사용하여 웹툰 데이터를 가져옴
  const { isLoading, error, data } = useQuery({
    queryKey: [keyword],
    queryFn: fetchWebtoons,
  });

  // Loading & Error 처리
  if (isLoading) return <Loading size={72} />;
  if (error) return <p>정보를 불러오는데 실패했습니다.</p>;

  return (
    <div className="toon-list">
      {data.webtoons.length > 0 ? (
        data.webtoons.map((toon: any, index: number) => (
          <ToonItem toon={toon} key={index} />
        ))
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
}
