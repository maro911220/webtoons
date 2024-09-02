"use client";
import "@/style/components/header.scss";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

const list = [
  { name: "NAVER", src: "/icon/logo_naver.png" },
  { name: "KAKAO", src: "/icon/logo_kakao.png" },
  { name: "KAKAO_PAGE", src: "/icon/logo_kakao_page.png" },
];

export default function Header() {
  const path = useSelectedLayoutSegments();
  const activeName = path[path.length - 1];
  const [search, setSearch] = useState<string>();
  const onValueChange = (value: string) => setSearch(value);
  const movePage = () => (location.href = `/search/${search}`);

  return (
    <header className="header">
      <div className="header-con">
        <h1 className="header-title">
          <Link href={"/"}>Webtoon</Link>
        </h1>
        <div className="header-search">
          <input
            type="text"
            defaultValue={search}
            onChange={(e) => onValueChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && movePage()}
            placeholder="제목 또는 작가를 입력해주세요"
          />
          <button onClick={movePage}>검색</button>
        </div>
        <ul className="header-list">
          {list.map((item, index) => (
            <li
              key={index}
              className={`header-list-item ${
                item.name === activeName ? "active" : ""
              }`}
            >
              <Link href={`/list/${item.name}`}>
                <Image
                  width={100}
                  height={100}
                  src={item.src}
                  alt={item.name}
                />
              </Link>
            </li>
          ))}
          <li className="header-list-item">
            <a className="header-git" href="#none">
              <Github strokeWidth={1.5} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
