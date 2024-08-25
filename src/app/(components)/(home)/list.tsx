"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import "@/style/components/home/list.scss";

export default function List() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [page, setPage] = useState(1);
  const [webtoonList, setWebtoonList] = useState<any[]>([]);

  const newWebtoonList = () => {
    const list = webtoonList;
    axios("https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons", {
      params: {
        page: page,
        perPage: 40,
        isUpdated: true,
      },
    }).then((res) => {
      if (!res.data.isLastPage) {
        list.push(...res.data.webtoons);
        setPage(page + 1);
        setWebtoonList([...list]);
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    newWebtoonList();
  }, []);

  // 무한 스크롤
  useEffect(() => {
    if (inView && page > 1) {
      newWebtoonList();
    }
  }, [inView]);
  return (
    <div className="list">
      <AnimatePresence>
        {webtoonList.map((web, index) => {
          return (
            <motion.a className="list-item" href={web.url} key={index}>
              <img
                src={web.thumbnail[0]}
                alt={web.title}
                width={100}
                height={100}
              />
              <span>{web.title}</span>
            </motion.a>
          );
        })}
      </AnimatePresence>
      <div className="absolute bottom-0 opacity-0" ref={ref}>
        <p>트리거에용</p>
      </div>
    </div>
  );
}
