/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/(components)/loading";
import { useState, useCallback } from "react";

// API URL 및 요일 데이터
const API_URL = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons";
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const DAYS_KO = ["월", "화", "수", "목", "금", "토", "일"];

// 현재 요일을 얻는 함수
const getCurrentDayIndex = () => (new Date().getDay() + 6) % 7;

export default function Page({ params }: any) {
  const [dayIndex, setDayIndex] = useState(getCurrentDayIndex());

  return (
    <div className="toon-con">
      <div className="toon-day-selector">
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
      <ToonList dayIndex={dayIndex} provider={params.id} />
    </div>
  );
}

// 상세
function ToonList({
  dayIndex,
  provider,
}: {
  dayIndex: number;
  provider: string;
}) {
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

  const { isLoading, error, data } = useQuery({
    queryKey: [provider, DAYS[dayIndex]],
    queryFn: fetchWebtoons,
  });

  // Loading & Error 처리
  if (isLoading) return <Loading size={72} />;
  if (error) return <p>정보를 불러오는데 실패했습니다.</p>;

  return (
    <div className="toon-list">
      {data.webtoons.map((toon: any, index: number) => (
        <a
          className="toon-list-item"
          href={toon.url}
          key={index}
          target="_blank"
        >
          <img src={toon.thumbnail[0]} alt={toon.title} />
          <div className="toon-list-item__box">
            <p>{toon.title}</p>
            <div>
              {toon.authors.map((name: string, index: number) => (
                <span key={index}>{name}</span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
