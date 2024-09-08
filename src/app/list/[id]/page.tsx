"use client";
import axios from "axios";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/(components)/loading";
import ToonItem from "@/app/(components)/toonItem";

// API URL 및 요일 데이터
const API_URL = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons";
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const DAYS_KO = ["월", "화", "수", "목", "금", "토", "일"];

// 현재 요일을 얻는 함수
const getCurrentDayIndex = () => (new Date().getDay() + 6) % 7;

export default function Page({ params }: any) {
  // 요일 인덱스 상태 관리
  const [dayIndex, setDayIndex] = useState(getCurrentDayIndex());

  return (
    <div className="toon-con">
      {/* 요일 버튼 리스트 */}
      <div className="toon-con-header">
        {DAYS_KO.map((day, index) => (
          <button
            key={index}
            className={index === dayIndex ? "active" : ""}
            onClick={() => setDayIndex(index)}
          >
            {day}
          </button>
        ))}
      </div>
      {/* 선택 요일의 웹툰 목록 표시 */}
      <ToonList dayIndex={dayIndex} provider={params.id} />
    </div>
  );
}

// 웹툰 목록을 가져오는 컴포넌트
function ToonList({
  dayIndex,
  provider,
}: {
  dayIndex: number;
  provider: string;
}) {
  // 웹툰 데이터를 가져오는 함수
  const fetchWebtoons = useCallback(async () => {
    const response = await axios.get(API_URL, {
      params: {
        perPage: 100,
        provider: provider,
        updateDay: DAYS[dayIndex],
      },
    });
    return response.data;
  }, [dayIndex, provider]);

  // React Query를 사용하여 웹툰 데이터를 가져옴
  const { isLoading, error, data } = useQuery({
    queryKey: [provider, DAYS[dayIndex]],
    queryFn: fetchWebtoons,
  });

  // Loading & Error 처리
  if (isLoading)
    return (
      <div className="py-4">
        <Loading size={72} />
      </div>
    );
  if (error)
    return <p className="py-4 text-center">정보를 불러오는데 실패했습니다.</p>;

  // 웹툰 리스트 렌더링
  return (
    <div className="toon-list">
      {data.webtoons.map((toon: any, index: number) => (
        <ToonItem toon={toon} key={index} />
      ))}
    </div>
  );
}
