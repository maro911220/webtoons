import "@/style/components/header.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header-con">
        <ul className="header-list">
          <li>
            <Link href={"/h"}>Naver</Link>
            <Link href={"/h"}>Kakao</Link>
            <Link href={"/h"}>Kakao Page</Link>
          </li>
        </ul>
        <h1 className="header-title">Webtoon</h1>
        <a className="header-git" href="#none">
          git
        </a>
      </div>
    </header>
  );
}
