"use client";
import "@/style/components/header.scss";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { defaultStore } from "@/store/store";

export default function Header() {
  const toonWeb = defaultStore((state) => state.toonWeb);
  const path = useSelectedLayoutSegments();
  const activeName = path[path.length - 1];
  const [search, setSearch] = useState<string>("");

  // 검색값 업데이트
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 페이지로 이동
  const handleSearchSubmit = () => {
    if (search) location.href = `/search/${search}`;
  };

  return (
    <header className="header">
      <div className="header-con">
        <h1 className="header-title">
          <Link href={"/"}>Webtoon</Link>
        </h1>
        {/* 검색 바 */}
        <div className="header-search">
          <input
            type="text"
            defaultValue={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            placeholder="제목 또는 작가를 입력해주세요"
          />
          <button onClick={handleSearchSubmit}>검색</button>
        </div>
        {/* 네비게이션 리스트 */}
        <ul className="header-list">
          {toonWeb.map((item, index) => {
            const upperItem = item.toUpperCase();
            return (
              <li
                key={index}
                className={`header-list-item ${
                  upperItem === activeName ? "active" : ""
                }`}
              >
                <Link href={`/list/${upperItem}`}>
                  <Image
                    width={100}
                    height={100}
                    src={`/icon/logo_${item}.svg`}
                    alt={item}
                  />
                </Link>
              </li>
            );
          })}
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
