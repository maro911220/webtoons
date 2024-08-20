"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  // sample
  const [webtoonList, setWebtoonList] = useState<any[]>([]);
  useEffect(() => {
    let list: any[] = [];
    let num = 1;
    const loadWebtoons = (page: number) => {
      axios("https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons", {
        params: {
          page: page,
          provider: "NAVER",
          updateDay: "MON",
          perPage: 50,
        },
      }).then((res) => {
        list.push(...res.data.webtoons);
        if (!res.data.isLastPage) {
          num = num + 1;
          loadWebtoons(num);
        } else {
          setWebtoonList(list);
        }
      });
    };

    loadWebtoons(num);
  }, []);

  return (
    <>
      {/* hero && search */}
      <section></section>
      {/* new card */}
      <section>
        {webtoonList.map((web, index) => {
          return <p key={index}>{web.title}</p>;
        })}
      </section>
    </>
  );
}
