/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/(components)/loading";
import { useCallback } from "react";

// API URL
const API_URL = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons";

export default function Page({ params }: any) {
  return (
    <div className="toon-con">
      <ToonList keyword={decodeURI(params.id)} />
    </div>
  );
}

// 상세
function ToonList({ keyword }: { keyword: string }) {
  const fetchWebtoons = useCallback(async () => {
    const response = await axios.get(API_URL, {
      params: {
        perPage: 20,
        keyword: keyword,
      },
    });
    return response.data;
  }, [keyword]);

  const { isLoading, error, data } = useQuery({
    queryKey: [keyword],
    queryFn: fetchWebtoons,
  });

  // Loading & Error 처리
  if (isLoading) return <Loading size={72} />;
  if (error) return <p>정보를 불러오는데 실패했습니다.</p>;

  return (
    <div className="toon-list">
      {data.webtoons.length > 1 ? (
        data.webtoons.map((toon: any, index: number) => (
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
        ))
      ) : (
        <p>없다..</p>
      )}
    </div>
  );
}
