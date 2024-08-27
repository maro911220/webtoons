import "@/style/components/header.scss";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-con">
        <ul className="header-list">
          <li className="header-list-item">
            <Link href={"/h"}>
              <Image
                src="/icon/logo_naver.png"
                width={100}
                height={100}
                alt="Naver"
              />
            </Link>
          </li>
          <li className="header-list-item">
            <Link href={"/h"}>
              <Image
                src="/icon/logo_kakao.png"
                width={100}
                height={100}
                alt="Naver"
              />
            </Link>
          </li>
          <li className="header-list-item">
            <Link href={"/h"}>
              <Image
                src="/icon/logo_kakao_page.png"
                width={100}
                height={100}
                alt="Naver"
              />
            </Link>
          </li>
        </ul>
        <h1 className="header-title">Webtoon</h1>
        <a className="header-git" href="#none">
          <Github />
        </a>
      </div>
    </header>
  );
}
